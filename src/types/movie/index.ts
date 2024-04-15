interface User {
  id: number
  email: string
}

export interface MovieResponse {
  id: number
  user_id: number
  youtube_id: string
  title: string
  description: string
  thumbnail_url: string
  url: string
  user: User
}
