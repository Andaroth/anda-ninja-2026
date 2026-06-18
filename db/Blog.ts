import { CategoryType, ICategoryCreate, CategoryMutation, ArticleType, ArticleMutation, IArticleCreate } from "@/data/types/blog";
import { sql } from "@vercel/postgres";

export const Category = {
  getAll: async (): Promise<Array<CategoryType>> => {
    const { rows }: { rows: Array<CategoryType> } = await sql`SELECT * FROM categories;`
    if (rows) return JSON.parse(JSON.stringify(rows))
  },
  getOne: async (byId: number): Promise<CategoryType> => {
    const { rows }: { rows: Array<CategoryType> } = await sql`SELECT * FROM categories WHERE id = ${byId};`
    if (rows[0]) return JSON.parse(JSON.stringify(rows[0]))
  },
  update: async (updateCategory: CategoryMutation): Promise<CategoryType> => {
    let sqlCategory = ``
    Object.keys(updateCategory).forEach(key => sqlCategory += `${[key]}=${updateCategory[key]},`)
    sqlCategory = `(${sqlCategory.substring(0, sqlCategory.length - 1)})`
    const { rows }: { rows: Array<CategoryType> } = await sql`UPDATE categories ${sqlCategory} WHERE id = ${updateCategory.id};`
    if (rows[0]) return JSON.parse(JSON.stringify(rows[0]))
  },
  create: async (category: ICategoryCreate): Promise<CategoryType> => {
    let sqlCategory = ``
    Object.keys(category).forEach(key => sqlCategory += `${[key]}=${category[key]},`)
    sqlCategory = `(${sqlCategory.substring(0, sqlCategory.length - 1)})`
    const { rows }: { rows: Array<CategoryType> } = await sql`INSERT INTO categories (${sqlCategory});`
    return JSON.parse(JSON.stringify(rows[0]))
  },
  seed: async () => {
    const createTable = await sql`CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name text NOT NULL,
      tags text[] NOT NULL
    );`
    return createTable
  }
}

export const Article = {
  getLast: async () => {
    const { rows }: { rows: Array<ArticleType> } = await sql`SELECT *
      FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
        FROM articles
      ) AS subquery
      WHERE rn = 1;`
    if (rows[0]) return JSON.parse(JSON.stringify(rows[0]))
  },
  getAll: async (limit: number = 10) => {
    const { rows }: { rows: Array<ArticleType> } = await sql`SELECT * FROM (
        SELECT * FROM articles ORDER BY id DESC LIMIT ${limit}
      ) as r ORDER BY id;`
    if (rows[0]) return JSON.parse(JSON.stringify(rows.sort((a, b) => b.id - a.id)))
  },
  update: async (_updateArticle: ArticleMutation): Promise<ArticleType> => {
    let sqlArticle = ``
    const updateArticle = Object.assign(_updateArticle, {
      updatedAt: new Date()
    })
    Object.keys(updateArticle).forEach(key => sqlArticle += `${[key]}=${updateArticle[key]},`)
    sqlArticle = `(${sqlArticle.substring(0, sqlArticle.length - 1)})`
    const { rows }: { rows: Array<ArticleType> } = await sql`UPDATE articles ${sqlArticle} WHERE id = ${updateArticle.id};`
    if (rows[0]) return JSON.parse(JSON.stringify(rows[0]))
  },
  create: async (category: IArticleCreate): Promise<ArticleType> => {
    let sqlArticle = ``
    Object.keys(category).forEach(key => sqlArticle += `${[key]}=${category[key]},`)
    sqlArticle = `(${sqlArticle.substring(0, sqlArticle.length - 1)})`
    const { rows }: { rows: Array<ArticleType> } = await sql`INSERT INTO articles (${sqlArticle});`
    return JSON.parse(JSON.stringify(rows[0]))
  },
  seed: async () => {
    const createTable = await sql`CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title text NOT NULL,
      description text NOT NULL,
      content text NOT NULL,
      createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
      updatedAt timestamp,
      href jsonb[],
      tags text[],
      categories int[]
    );`
    return createTable
  }
}