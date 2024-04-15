import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Form from './form'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/apis', () => ({
  $api: {
    movie: {
      createMovie: jest.fn(),
    },
  },
}))

jest.mock('@/store', () => ({
  messageContent: {
    useSetRecoilState: jest.fn(),
  },
}))

jest.mock('recoil', () => ({
  useSetRecoilState: jest.fn(),
}))

// let token = ''

describe('Form', () => {
  beforeEach(() => {
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', () => {
    render(<Form />)

    expect(screen.getByText('Share a Youtube movie')).toBeInTheDocument()
    expect(screen.getByLabelText('Youtube URL:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument()
  })
})
