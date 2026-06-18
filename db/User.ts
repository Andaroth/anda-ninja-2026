
"use server"
import { DiscordProfileType, DiscordAccountType, UserProfileType, UserType, UserMutation, IUserCreate } from "@/data/types/user"
import { DiscordAccessTokenType } from "@/data/types/discord"
import { sql } from "@vercel/postgres";

export default class User implements IUserCreate {
  id?: number
  email: string
  last_connected_at: Date
  last_ip: string
  access_token: DiscordAccessTokenType
  discord_profile?: DiscordProfileType // relation
  discord_account?: DiscordAccountType // relation
  user_profile?: UserProfileType // relation

  constructor(props: UserType) {
    this.id = props.id
    this.email = props.email
    this.last_connected_at = props.last_connected_at || new Date();
    this.last_ip = props.last_ip
    this.access_token = props.access_token
    this.discord_profile = props.discord_profile
    this.discord_account = props.discord_account
    this.user_profile = props.user_profile
  }

  public getDiscordAccount = async (byId: number) => {
    // console.log('getDiscordProfile', byId)
    const query = `SELECT * FROM users WHERE discord_profile.id = ${byId.toString()};`
    const { rows }: { rows: Array<UserType> } = await sql`${query}`
    if (rows[0]) return rows[0].discord_account
  }

  public getDiscordProfile = async (byId: number) => {
    // console.log('getDiscordProfile', byId)
    const query = `SELECT * FROM users WHERE discord_profile.id = ${byId.toString()};`
    const { rows }: { rows: Array<UserType> } = await sql`${query}`
    if (rows[0]) return rows[0].discord_profile
  }

  public getUserProfile = async (byId: number) => {
    // console.log('getUserProfile', byId)
    const query = `SELECT * FROM users WHERE id = ${byId.toString()};`
    const { rows }: { rows: Array<UserType> } = await sql`${query}`
    if (rows[0]) return rows[0]
  }

  static update = async (updateUser: UserMutation): Promise<UserType> => {
    // console.log('update', updateUser)
    this._init_table()
    let sqlUser = ``
    Object.keys(updateUser).forEach(key => sqlUser += `${[key]}=${updateUser[key]},`)
    sqlUser = `(${sqlUser.substring(0, sqlUser.length - 1)})`
    // console.log('update sqlUser', sqlUser)
    const query = `UPDATE users ${sqlUser} WHERE id = ${updateUser.id};`
    const { rows }: { rows: Array<UserType> } = await sql`${query}`
    if (rows[0]) return rows[0]
    else return this.create(updateUser)
  }

  static create = async (user: IUserCreate | UserMutation): Promise<UserType> => {
    // console.log('create', user)
    this._init_table()
    let sqlUser = ``
    Object.keys(user).forEach(key => sqlUser += `${[key]}=${user[key]},`)
    sqlUser = `(${sqlUser.substring(0, sqlUser.length - 1)})`
    // console.log('create sqlUser', sqlUser)
    const query = `
      IF NOT EXISTS (SELECT * FROM users WHERE id = ${user.id})
      BEGIN
        INSERT INTO users (${sqlUser})
      END
      ELSE
      BEGIN
        SELECT * FROM users WHERE id = ${user.id}
      END;
    `;

    const { rows }: { rows: Array<UserType> } = await sql`${query}`
    return rows[0]
  }

  static _init_table = async () => {
    // console.log('_init_table')
    const query = `CREATE TABLE IF NOT EXISTS users (
      id int PRIMARY KEY,
      email varchar(255),
      password varchar(255),
      old_password varchar(255),
      last_connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_ip varchar(255) NOT NULL,
      access_token varchar(255) NOT NULL,
      discord_profile jsonb,
      discord_account jsonb,
      user_profile jsonb
    );`
    const createTable = await sql`${query}`
    // console.log('createTable', createTable)
    return createTable
  }
}