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
        this.tags = Object.freeze([...tags])

        Object.freeze(this)
    }
    // JSON to instance of Note
    static from(data) {
        return data instanceof Note ? data : new Note(data)
    }

    static draft() {
        return new Note()
    }

    withTitle(title) {
        return new Note({ ...this, title })
    }

    withContent(content) {
        return new Note({ ...this, content })
    }
}
