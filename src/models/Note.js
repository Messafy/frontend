// Immutable note model: instances are frozen, every change creates a new Note via withX().
export default class Note {
    constructor({
        id = null,
        title = 'Undefined Note',
        content = '',
        type = 'PRIVATE',
        status = null,
        ownerId = null,
        sharedWith = null,
        createdAt = null,
        readAt = null,
        date = null,
        tags = [],
        pinned = false,
    } = {}) {
        this.id = id
        this.title = title
        this.content = content
        this.type = type
        this.status = status
        this.ownerId = ownerId
        this.sharedWith = sharedWith
        this.createdAt = createdAt
        this.readAt = readAt
        this.date = date ?? createdAt
        this.tags = Object.freeze(Array.isArray(tags) ? [...tags] : [])
        this.pinned = Boolean(pinned)

        Object.freeze(this)
    }
    // JSON to instance of Note
    static from(data) {
        return data instanceof Note ? data : new Note(data)
    }

    // Unsaved note with null id until the first save round-trip.
    static draft() {
        return new Note()
    }

    // Immutable updates: never mutate a Note directly, always return a new one.
    withTitle(title) {
        return new Note({ ...this, title })
    }

    withContent(content) {
        return new Note({ ...this, content })
    }

    withTags(tags) {
        return new Note({ ...this, tags })
    }

    withStatus(status) {
        return new Note({ ...this, status })
    }

    withPinned(pinned) {
        return new Note({ ...this, pinned })
    }
}
