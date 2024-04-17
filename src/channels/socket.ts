import { createConsumer } from '@rails/actioncable'

const socket = (token: string) => {
  return createConsumer(`ws://obscure-beyond-24006-9ba56bd5d8e2.herokuapp.com/cable?token=${token}`)
}

export default socket
