import axios from 'axios'

const handleError = (error: any) => {
  console.log('error', error.response)
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message || error.message
    const detail = error.response?.data.detail

    if (detail && Object.keys(detail).length > 0) {
      Object.values(detail).forEach((errorArray) => {
        console.log({
          type: 'error',
          message: (errorArray as string[])[0],
        })
      })
    } else if (
      error.response?.data.errors &&
      error.response?.data.errors.length > 0
    ) {
      console.log({
        type: 'error',
        message: error.response?.data.errors[0],
      })
    } else if (message) {
      console.log({
        type: 'error',
        message,
      })
    }
  }
}

export default handleError
