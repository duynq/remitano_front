import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { $api } from '@/apis'
import { messageContent } from '@/store'
import { useSetRecoilState } from 'recoil'

const Form = () => {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const setMessage = useSetRecoilState(messageContent)

  const createMovie = async () => {
    const data = {
      url: youtubeUrl
    }

    try {
      const res = await $api.movie.createMovie(data)
      router.push('/')
      setMessage('')
    } catch (error) {
      setMessage((error as any)?.response?.data?.detail?.url[0])
    }
  }

  return (
    <div className='m-64 flex flex-col items-center'>
      <div className='min-w-1/2 border rounded p-4'>
          <h1 className='text-3xl mb-5'>Share a Youtube movie</h1>
          <div className="md:flex md:items-center mt-7 mb-6">
            <div className="md:w-1/3">
              <label className="mb-1 md:mb-0 pr-4" htmlFor="youtube-url">
                Youtube URL:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="youtube-url"
                className="border w-full py-2 px-4 leading-tight"
                type="text"
                placeholder="Youtube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
          </div>
          <br/>
          <div className="flex justify-center mb-5">
            <button className='w-1/2 border py-2 px-4 rounded' onClick={createMovie}>Share</button>
          </div>
      </div>
    </div>
  )
}

export default Form
