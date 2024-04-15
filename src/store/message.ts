import { atom } from 'recoil'

const messageContent = atom<string>({
  key: 'useMessage',
  default: '',
})

export { messageContent }
