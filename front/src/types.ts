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
  followers: Omit<IUser, 'login' | 'password'>[]
  following: Omit<IUser, 'login' | 'password'>[]

}

export interface IConnection {
  following: boolean
  followsMe: boolean
  requested: boolean
  blockedMe: boolean
  didIBlock: boolean
}

export interface IRequest {
  id: number
  user: Omit<IUser, 'password' | 'login'>
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
  account: IAccount
  setAccount: (user: IAccount) => void
}

// ---------------------------
// Post-related Type
// ---------------------------

export interface IPost {
  picture: File
  title: string
  likes: IUser[]
  comments: IComment[]
  userId: number
  id: number
}

export interface IComment {
  content: string
  id:number
  user: {
    id: number
    name: string
    surname: string
    picture: string
  }
}