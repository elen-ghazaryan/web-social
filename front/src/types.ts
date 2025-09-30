// ---------------------------
// User-related Types
// ---------------------------

export interface IUser {
  id: number
  name: string
  surname: string
  login: string
  password: string
  picture: string | null
  cover: string | null
  isPrivate: number
}

export type IAccount = Omit<IUser, 'password' | 'login'> & {
  connection: IConnection
  posts: IPost[]
  followers: IUser[]
  following: IUser[]

}

export interface IConnection {
  following: boolean
  folloswMe: boolean
  requested: boolean
  blockedMe: boolean
  didIBlock: boolean
}

// User type for signup (excludes auto-generated or optional fields)
export type SignupUser = Omit<IUser, "id" | "picture" | "cover" | "isPrivate">

// User type for authentication (only login credentials)
export type AuthUser = Pick<IUser, 'login' | 'password'>

// Type for updating user password
export type UpdateUserPassword = {
  oldPassword: number
  newPassword: number
}

// ---------------------------
// API Response Type
// ---------------------------

export interface IResponse<T = unknown> {
  status: string
  message: string
  payload: T
}

// ---------------------------
// React Context Type
// ---------------------------

export interface IContext {
  account: IUser
  setAccount: (user: IUser) => void
}

// ---------------------------
// Post-related Type
// ---------------------------

export interface IPost {
  picture: File
  title: string
  likes: number[]
  userId: number
  id: number
}