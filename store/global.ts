import { create } from 'zustand'

import type { DiscordAccountType } from '@/data/types/user'

export type themeNameType = "default" | "red" | "hell"
export type AvailableLangs = "fr" | "en"

export type IAuthStoreValue = {
  account?: DiscordAccountType
  cgu?: boolean
  theme: themeNameType
  lang?: AvailableLangs
}

export const INIT_VALUES: IAuthStoreValue = {
  account: null,
  cgu: false,
  theme: "default",
  lang: "fr"
}

export type IAuthStoreAction = {
  setAccount: (account: DiscordAccountType) => void,
  setCgu: (cgu: boolean) => void,
  setTheme: (name: themeNameType) => void,
  setLang: (lang: AvailableLangs) => void,
  initStore: (assign?: IAuthStoreValue) => void
}

const handleSetAccount = (set, account: IAuthStoreValue["account"]) => {
  if (!account) {
    localStorage.removeItem('discord_account')
    localStorage.removeItem('hx_biscuit')
  } else {
    localStorage.setItem('discord_account', JSON.stringify(account))
  }
  set({ account })
}

const handleCetCgu = (set, cgu: IAuthStoreValue["cgu"]) => {
  if (cgu) localStorage.setItem('cgu', 'accept')
  else localStorage.removeItem('cgu')
  set({ cgu })
}

const handleSetLang = (set, lang: AvailableLangs) => {
  localStorage.setItem('lang', lang)
  set({ lang })
}

const handleInit = (set, assign?: IAuthStoreValue) => {
  const setter = Object.assign(INIT_VALUES, assign)
  set({ ...setter })
}

const useStore = create<IAuthStoreValue & IAuthStoreAction>((set) => ({
  ...INIT_VALUES,
  setAccount: (account?: DiscordAccountType) => handleSetAccount(set, account),
  setCgu: (cgu: boolean) => handleCetCgu(set, cgu),
  setTheme: (theme: themeNameType) => set(() => ({ theme })),
  setLang: (lang: AvailableLangs) => handleSetLang(set, lang),
  initStore: (assign?: IAuthStoreValue) => handleInit(set, assign),
}))

export default useStore