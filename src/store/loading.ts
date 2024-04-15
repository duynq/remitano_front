import { atom } from 'recoil'

const loadingState = atom<boolean>({
  key: 'userOverlazyLoading',
  default: false,
})

export { loadingState }
