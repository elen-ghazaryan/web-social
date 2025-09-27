export interface IUser {
  id: number
  name: string
  surname: string
  login: string
  password: string
}

export type NewUser = Omit<IUser, "id">
export type AuthUser = Pick<IUser, 'login' | 'password'>

export type UpdateUserPassword = {
  oldPassword:number
  newPassword:number
}

export interface IResponse {
  status: string
  message:string
  payload: unknown
}

export interface IContext {
  account: IUser
}