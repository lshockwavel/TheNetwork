export class Account {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} class
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * @property {string} bio
   * @property {string} coverImg
   * @property {string} linkedin
   * @property {string} github
   * @property {string} resume
   * @property {boolean} graduated
   *
   * @param {AccountData} data
   */
  constructor(data) {
    this.id = data.id
    this.class = data.class
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.graduated = data.graduated
    this.github = data.github
    this.resume = data.resume
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.linkedin = data.linkedin
  }
}
