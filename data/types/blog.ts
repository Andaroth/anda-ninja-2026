export type CategoryType = {
  id: number
  name: string
  tags: Array<string>
}

export type ArticleType = {
  id: number
  title: string
  description: string
  content: string // markdown
  createdat: Date
  updatedAt?: Date
  author?: string
  href: Array<{
    url: string
    label: string
    target?: '_self' | '_blank' | '_parent' | '_top'
  }>
  tags: Array<string>
  categories: Array<CategoryType['id']>
}

export type CategoryMutation = {
  id: number
  name?: string
  tags?: Array<string>
}

export type ICategoryCreate = {
  name: string
  tags?: Array<string>
}

export type ArticleMutation = {
  id: number
  title?: string
  description?: string
  content?: string // markdown
  href?: Array<{
    url: string
    label: string
    target?: '_self' | '_blank' | '_parent' | '_top'
  }>
  tags?: Array<string>
  categories?: Array<CategoryType['id']>
}

export type IArticleCreate = {
  id: number
  title: string
  description: string
  content: string // markdown
  href?: Array<{
    url: string
    label: string
    target?: '_self' | '_blank' | '_parent' | '_top'
  }>
  tags?: Array<string>
  categories?: Array<CategoryType['id']>
}