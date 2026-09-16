# Messafy Frontend

Messafy is a private note-taking interface built as a React single-page application. It combines a public product surface, an authenticated workspace, and a deliberately structured component system without hiding the application behind a large frontend framework. The client is responsible for navigation, session persistence, local editing state, and interaction design; the Spring Boot API remains the authority for identity, ownership, lifecycle transitions, and persistence.

The project uses React 19, Vite 8, React Router 7, Sass, PropTypes, and browser-native `fetch`. It is written in JavaScript and JSX rather than TypeScript. The architecture favors explicit state transitions, immutable note objects, semantic HTML, and component-local SCSS backed by shared design tokens.

## Product surface

The application has three routes. `/` presents the public Messafy landing page. `/login` contains the credential flow and redirects sessions that already contain a token. `/notes` is the authenticated workspace and redirects to login when no stored token exists.

The note workspace is a three-pane desktop interface. The sidebar selects All Notes, Pinned Notes, or Trash. The middle pane lists the notes visible under that filter. The editor owns the current draft or selected note and exposes title, content, metadata, tags, formatting actions, save, and logical deletion. Deleted notes remain readable in Trash but cannot be edited, pinned, restored, or permanently removed through the current interface.

Tags are validated on the client using the same character vocabulary as the backend: Unicode letters and marks, numbers, spaces, hyphens, and underscores. Duplicate tags are rejected case-insensitively. Pinning is persisted independently from editor save, and pinned notes are promoted to the beginning of active lists.

The editor is a plain-text editor with lightweight Markdown-style insertion. Formatting actions wrap the current textarea selection for bold, italic, underline-like syntax, links, and ordered or unordered lists. The client does not render a Markdown preview; formatting remains literal text sent to the API.

## Application architecture

The frontend uses Atomic Design as its visual organization model. It is not treated as a rigid application-layer framework. Atoms express controls and typography, molecules combine reusable interaction patterns, organisms build substantial interface regions, and pages coordinate routes, state, and API calls.

```text
src
├── app
│   └── App.jsx
├── components
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   └── pages
├── context
├── models
├── mocks
├── styles
│   ├── globals.scss
│   └── tokens
└── main.jsx
```

Most components live in a dedicated folder with adjacent JSX and SCSS files. Shared behavior is introduced when it represents genuine reuse rather than to satisfy a taxonomy. Organisms may compose other organisms when one region naturally contains another, as `NoteEditor` composes `NoteEditorToolbar` and `NoteList` composes note cards.

Pages are the stateful integration boundary. `LoginPage` coordinates validation, authentication, account retrieval, and navigation. `NotePage` coordinates the note reducer, current selection, filters, API operations, and the three-pane workspace. There is currently no API service layer or custom data-fetching hook: network calls remain visible at the page where their state is owned.

## Routing and session lifecycle

`App.jsx` creates a React Router data router. Route loaders read the persisted session directly before rendering protected or guest-only pages. `requireAuth` redirects to `/login` when no token exists; `requireGuest` redirects to `/notes` when a token is present.

These guards are navigation controls, not security boundaries. They check token presence only. They do not parse expiration, validate a signature, verify account status, or contact the backend. Every protected API operation still depends on backend authentication and authorization.

The authentication context is split into small responsibilities. `authSession.js` reads and writes the `session` localStorage key. Invalid stored JSON is removed instead of crashing application startup. `AuthProvider` initializes from that storage and exposes the current session together with `login`, `logout`, and `isAuthenticated`. `useAuth` prevents context access outside the provider.

Login is intentionally a two-request sequence. The client first posts the email and raw password to `/v1/auth/login`. If the backend returns a token, the client uses it to fetch `/v1/accounts/me`. Only after both requests succeed does the application persist `{ token, account }` and navigate to the note workspace. A token is therefore not stored with a missing account snapshot.

The context includes logout behavior, but the current UI does not expose a logout control. There is also no refresh-token flow, centralized `401` recovery, or automatic removal of an expired session. Because the bearer token is stored in localStorage, production hardening must treat script injection and content security policy as material security concerns.

## Immutable note state

API JSON is converted into instances of `src/models/Note.js`. A `Note` is immutable: the instance and its copied tag collection are frozen. Editing uses `withTitle`, `withContent`, `withTags`, `withStatus`, and `withPinned`, each of which returns a new instance instead of changing existing state.

This model gives the reducer a reliable value boundary. `NotePage` owns the persisted collection through `useReducer` and keeps the currently edited note in separate React state. `LOAD_NOTES` replaces the collection after checking that every value is a `Note`. `SAVE_NOTE` replaces or appends one note. `DELETE_NOTE` performs a local soft deletion by changing status to `DELETED`. `PIN_NOTE` replaces only the pin state of the matching note.

The selected note is a working copy. Typing in the editor does not mutate the collection shown by the list. Only a successful save merges the edited note back into reducer state. This makes state transitions explicit, but it also means unsaved edits can be discarded by selecting another note or changing filters. There is no autosave, dirty-state indicator, or navigation warning.

Creating a note starts with `Note.draft()`, which has no ID and is not inserted into the list until the backend accepts it. Deleting an unsaved draft only closes the editor. Persisted deletion leaves the note in local state with `DELETED` status so Trash can display it without another reload.

## Data flow

When an authenticated session becomes available, `NotePage` fetches active notes and trash concurrently. Both responses must succeed before the arrays are combined and normalized into immutable notes. The interface currently has no loading state, partial-result strategy, visible retry action, or user-facing note error surface; failures are written to the browser console.

Saving chooses between creation and update based on whether the note has an ID. A new note is created as `PRIVATE` and sends the current account identifier as `sharedWith` to satisfy the current backend contract. An existing note sends title, content, and tags through `PATCH`. Server response data is merged over the local object so generated IDs and authoritative fields win.

Deletion follows the backend's explicit contract: `DELETE /v1/notes` carries `{ id }` in a JSON body. Pinning uses its own `PATCH /v1/notes/{id}/pin` operation and consumes the returned pin state. Drafts and deleted notes cannot be pinned. Unpinning from the Pinned Notes view removes the note from that filter and clears the editor selection.

All API origins are currently hardcoded as `http://localhost:8080` inside `LoginPage.jsx` and `NotePage.jsx`. There is no `VITE_*` base URL, proxy, API module, request timeout, cancellation, retry policy, or centralized unauthorized response handler. Changing the backend host requires updating every occurrence, and an HTTPS frontend deployment requires an HTTPS API to avoid mixed-content blocking.

## Backend contract

The frontend consumes the following subset of the Messafy API:

| Method | Endpoint | Client responsibility |
| --- | --- | --- |
| `POST` | `/v1/auth/login` | Submit email and `rawPassword`, receive a token |
| `GET` | `/v1/accounts/me` | Build the account snapshot for the session |
| `GET` | `/v1/notes?ownerId={accountId}` | Load active notes visible to the current account |
| `GET` | `/v1/notes/trash` | Load deleted notes owned by the current account |
| `POST` | `/v1/notes` | Create a private note with tags |
| `PATCH` | `/v1/notes/{id}` | Save title, content, and tags |
| `PATCH` | `/v1/notes/{id}/pin` | Persist pin state independently from editor save |
| `DELETE` | `/v1/notes` | Soft-delete the note identified in the JSON body |

Every note operation sends `Authorization: Bearer <token>`. Mutating requests send JSON. The client does not currently call the backend's mark-as-read endpoint, expose shared-note creation, or provide account registration even though the login footer links to `/register`.

## Design system

Messafy uses a dark zinc-oriented visual language with restrained contrast, muted borders, a desaturated light accent, and rain-inspired decorative blues on the public surface. Inter is the primary typeface and JetBrains Mono is available for monospaced contexts. Fonts are requested from Google Fonts in `index.html`, so their intended rendering depends on network access unless they are self-hosted later.

SCSS tokens live under `src/styles/tokens`. `_colors.scss` defines primitive and semantic colors for application surfaces, text, controls, editor regions, selection, status, and decorative rain. `_typography.scss` defines families, scales, weights, line heights, display typography, durations, and easing. `_mixins.scss` centralizes repeated control borders, focus behavior, icon buttons, ellipsis, scrollbars, grid overlays, solid buttons, and alignment.

Components consume the token index through Sass `@use`. BEM-like class names keep component structure readable without CSS Modules. The token system is substantial but intentionally incomplete: spacing, breakpoints, radii, elevation, and z-index are not yet formal scales, and some component-specific colors, shadows, and dimensions remain literals.

Animations are implemented through CSS and local component state. The `motion` dependency is installed but not used by the current source. Several prominent transitions honor `prefers-reduced-motion`; the decorative rain field still needs an equivalent reduced-motion treatment.

## Responsive behavior

The landing page is responsive. Its two-column hero becomes a single column, actions stack on narrow screens, the header simplifies, typography scales with `clamp`, and the decorative product preview reduces its structure and removes perspective transforms. The login page uses a centered fluid card and viewport-relative height without requiring a complex breakpoint model.

The authenticated note workspace is currently desktop-first. Its grid reserves fixed sidebar and note-list columns before assigning remaining width to the editor. No breakpoint transforms the panes into drawers, stacked screens, or route-driven panels. The formatting toolbar can scroll horizontally, but the page as a whole can compress or clip on small screens. Mobile adaptation is therefore a known product requirement rather than a completed capability.

## Accessibility

The interface uses semantic landmarks including `main`, `header`, `nav`, `aside`, `section`, `article`, `form`, and `time`. Login controls expose validation state and descriptions. Icon-only controls generally provide accessible names. Pin and filter controls expose pressed state, the formatting region is an accessible toolbar, and the tag editor identifies itself as a dialog and closes with Escape. Decorative rain and the landing preview are removed from the accessibility tree.

The accessibility baseline is not complete. Note cards are clickable articles without keyboard selection behavior. The decorative preview contains native controls inside an `aria-hidden` subtree. The home header nests a button inside a link. The shared textarea removes its native focus outline without a replacement, and the tag dialog does not trap or restore focus. There is no automated accessibility linting or browser audit in the toolchain.

These gaps are documented rather than hidden because semantic markup is an architectural standard of the project, not a claim of certification. The corresponding backend documentation repository contains the accepted accessibility ADR and its current implementation status.

## Project setup

Vite 8 and the current Sass release require Node.js `20.19` or newer within the Node 20 release line, or Node.js `22.12` or newer. Install the exact dependency graph from the committed lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Vite uses its default local origin, normally `http://localhost:5173`. The Spring backend must be running at `http://localhost:8080` and must allow the Vite origin through CORS.

The frontend does not yet provide a registration page. A fresh environment therefore needs an account created through the backend before the login screen can open the workspace. With the backend running, provision one through `POST /v1/auth/register` using the contract documented in the backend README:

```bash
curl --request POST http://localhost:8080/v1/auth/register \
  --header 'Content-Type: application/json' \
  --data '{"email":"user@example.com","rawPassword":"password1!"}'
```

The example credential is for local development only. Use a unique secret outside a disposable environment.

Create and inspect a production build with:

```bash
npm run build
npm run preview
```

Run static analysis with:

```bash
npm run lint
```

There is no automated test framework or `test` script. The repository's executable verification is ESLint followed by the Vite production build.

## Deployment considerations

The app uses `createBrowserRouter`, so a static host must route unknown application paths back to `index.html`. Without history fallback, loading `/login` or `/notes` directly will produce a host-level 404 even though client navigation works.

A production deployment must replace the hardcoded local API origin, serve the frontend and backend over compatible secure origins, and configure backend CORS accordingly. A centralized environment-backed API client is the natural place to solve that concern. Public metadata already includes a description, robots directive, theme color, and partial Open Graph information, but canonical URLs, social images, route-specific metadata, a manifest, structured data, and a content security policy are not yet configured.

## Current engineering boundaries

The sidebar search, folders, create-folder action, and profile block are visual scaffolding rather than functional features. The profile text is hardcoded instead of derived from the authenticated account. There is no registration route, logout control, wildcard route, loading UI, autosave, restore flow, permanent deletion, shared-note creation interface, pagination, or note-operation retry behavior.

The custom error model, legacy note mocks, and `Progress` atom are currently unused. The source also contains a casing inconsistency in the `PlaceholderLIne` directory that must be respected on case-sensitive filesystems. These do not change the architectural direction, but they are visible cleanup opportunities before the project grows further.

Messafy's frontend architecture is intentionally direct. State is owned close to the page that coordinates it, immutable domain values make local transitions predictable, and the design system is code rather than an external component dependency. The next stage is not to add abstraction indiscriminately; it is to introduce it where current constraints are concrete: a configurable API boundary, mobile workspace navigation, visible asynchronous state, uniform session failure handling, and executable accessibility and behavior tests.
