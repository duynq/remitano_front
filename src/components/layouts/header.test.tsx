import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Header from '@/components/layouts/header'
import { userInfo } from '@/store'
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

describe('Header', () => {
  it('renders correctly', () => {
    render(
      <RecoilRoot>
        <Header title="Test Title" />
      </RecoilRoot>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('sets email state correctly when userInfo changes', async () => {
    render(
      <RecoilRoot initializeState={(snap) => snap.set(userInfo, {email: 'new@example.com'})}>
        <Header title="Test Title" />
      </RecoilRoot>
    )

    expect(screen.getByText('Welcome new@example.com')).toBeInTheDocument()
  })
})
