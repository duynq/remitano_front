// ** React Imports
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return <div className='container mx-auto mt-6'>
    {children}
  </div>
}

export default DefaultLayout
