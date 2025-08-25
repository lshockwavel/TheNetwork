

export class Profile {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.bio = data.bio;
        this.avatar = data.avatar;
        this.linkedin = data.linkedin;
        this.github = data.github;
        this.graduated = data.graduated || false;
        this.createdAt = new Date(data.createdAt);
        this.picture = data.picture || '';
        this.coverImg = data.coverImg || '';
        this.resume = data.resume || '';
    }

    get joinedDate() {
        return this.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}