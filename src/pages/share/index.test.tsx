import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import SharePage from './index'
import { atom } from 'recoil'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

jest.mock('@/store', () => ({
  userInfo: atom({ key: 'userInfo', default: { email: 'test@example.com' } }),
  userAuth: atom({ key: 'USER_AUTH_KEY', default: { token: 'eyJhbG' } }),
  messageContent: atom({ key: 'useMessage', default: 'Test Message' }),
}))

describe('SharePage', () => {
  it('renders without crashing', () => {
    render(
      <RecoilRoot>
        <SharePage />
      </RecoilRoot>
    )
  })

  it('renders the Form component', () => {
    const { getByText } = render(
      <RecoilRoot>
        <SharePage />
      </RecoilRoot>
    )
    expect(getByText('Welcome test@example.com')).toBeInTheDocument()
    expect(getByText('Share a Youtube movie')).toBeInTheDocument()
    expect(getByText('Share')).toBeInTheDocument()
  })
})
