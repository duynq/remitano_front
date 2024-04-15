// ** React Imports
import { ReactNode } from 'react'
import Form from '@/components/movies/form'
import Header from '@/components/layouts/header'
import DefaultLayout from '@/components/layouts/default_layout'
import withUserAuthentication from '@/hoc/withUserAuthentication'
import { messageContent } from '@/store'
import { useRecoilValue } from 'recoil'


const alert = (message: string) => {
  return <p className='text-center' >{message}</p>
}

const SharePage = withUserAuthentication(() => {
  const message = useRecoilValue(messageContent)

  return <>
    {message && alert(message)}
    <Header title='Funny Movies' />
    <Form />
  </>
})

SharePage.getLayout = (page: ReactNode) => <><DefaultLayout>{page}</DefaultLayout></>

export default SharePage
