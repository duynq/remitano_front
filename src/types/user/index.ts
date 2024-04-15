export interface User {
  id: number
  email: string
}

export type AccountLoginResponse = {
  token: string
}

export type AccountUserRequest = Partial<
  Pick<
    User,
    | 'email'
  > & {
    password?: string
  }
>
