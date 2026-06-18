import { DiscordAccessTokenType } from "./discord"
export type DiscordAccountType = {
  id: number,
  username: string,
  avatar: string,
  discriminator: string,
  public_flags: number,
  flags: number,
  banner: string,
  accent_color: number,
  global_name: string,
  avatar_decoration_data: {
    asset: string
    sku_id: string
  },
  banner_color: string,
  clan: null,
  mfa_enabled: true,
  locale: string,
  premium_type: number,
  email: string,
  verified: true,
}
export type DiscordProfileType = {
  id: string
  user_id: number // relation
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  flags: number
  banner: string
  accent_color: number
  global_name?: string
  avatar_decoration_data?: {
    asset: string
    sku_id: string
  }
  banner_color: string
  clan?: any
  mfa_enabled: boolean
  locale: string
  premium_type: number
  email: string
  verified: boolean
}

export type UserProfileType = {
  id: number
  user_id: number // relation
  scores: Array<{
    name: string // challenge
    value: number // amount of points
  }>
  credits: {
    USD: number
    EUR: number
    RHUM: number
  }
}

export interface IUserCreate {
  id?: number
  email: string
  // previous_emails?: Array<{
  //   email: string
  //   updatedAt: Date
  // }>
  password?: string
  // previous_passwords?: Array<{
  //   hash: string
  //   salt: string
  //   updatedAt: Date
  // }>
  // salt?: string
  last_connected_at: Date
  last_ip: string
  // previous_ips?: Array<string>
  access_token: DiscordAccessTokenType
  discord_profile?: DiscordProfileType
  discord_account?: DiscordAccountType
  user_profile?: UserProfileType
}

export interface UserType extends IUserCreate {
  id: number
}

export interface UserMutation extends UserType {
  email: string
  old_password?: string
  password?: string
  access_token: DiscordAccessTokenType
}