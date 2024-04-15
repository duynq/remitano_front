import { ReactNode } from 'react'
import DefaultLayout from '@/components/layouts/default_layout'

const Error404 = () => {
  return <div>Page not found</div>
}

Error404.getLayout = (page: ReactNode) => <><DefaultLayout>{page}</DefaultLayout></>

export default Error404
