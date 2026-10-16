Messafy Frontend

Messafy is a focused workspace for your notes. A three-pane layout keeps navigation, your note collection and the editor together, with tags for organization, pinned notes for quick access and a separate trash view. The public landing page and sign-in flow lead into a dark interface designed to keep the writing area at the center.

Built with React 19, JavaScript, Vite 8 and Sass, the frontend uses React Router for navigation and a component library organized through Atomic Design. Shared design tokens keep colors, typography and controls consistent. Immutable note objects and explicit reducer actions separate an editor draft from the saved collection, while the backend remains responsible for authentication, access rules and persistence.

For local development, use Node.js 22.12 or later, run npm ci and start the app with npm run dev. Vite normally serves it at http://localhost:5173 and uses http://localhost:8080 as the API by default. Set `VITE_API_URL` in a local `.env` file to override the API origin. Production builds default to `https://messafy-api.duckdns.org`; set the same variable in the hosting environment if the API origin changes. REST and WebSocket URLs are derived from this setting, including `wss://` for HTTPS deployments.

Run npm run lint to check the code and npm run build to generate the production bundle. Use npm run preview to inspect the build locally. Production hosting must serve index.html for application routes and use an API origin allowed by the backend's CORS policy.
