import { reactive } from 'vue'
import { Profile } from './models/Profile.js'
import { Post } from './models/Post.js'
import { Ad } from './models/Ad.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Profile} */
  activeProfile: null,

  /** @type {Profile[]} */
  profiles: [],

  /** @type {Post[]} */
  posts: [],

  /** @type {Post} */
  activePost: null,

  /** @type {Ad[]} */
  ads: [],

  currentPage: 1,
  totalPages: Infinity,

  currentSearch: ''
})

