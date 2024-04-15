import { ReactNode } from 'react'
import DefaultLayout from '@/components/layouts/default_layout'

const Error500 = () => {
  return <div>internal server errror</div>
}

Error500.getLayout = (page: ReactNode) => <><DefaultLayout>{page}</DefaultLayout></>

export default Error500
