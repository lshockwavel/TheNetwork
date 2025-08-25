


export class Post {
    constructor(data) {
        this.id = data.id;
        this.body = data.body;
        this.imgUrl = data.imgUrl;
        this.creatorId = data.creatorId;
        this.likeIds = data.likeIds;
        this.likes = data.likes;
        this.creator = data.creator;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }

    get createdDate() {
        return this.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    get updatedDate() {
        return this.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}