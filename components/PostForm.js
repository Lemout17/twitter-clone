import { useState } from 'react'
import useUserInfo from '../hooks/useUserInfo'
import axios from 'axios'

import Avatar from './Avatar'

export default function PostForm({
  onPost,
  compact,
  parent,
  placeholder = 'Whats happening?',
}) {
  const { userInfo, status } = useUserInfo()
  const [text, setText] = useState('')

  async function handlePostSubmit(e) {
    e.preventDefault()

    console.log({ status })
    await axios.post('/api/posts', { text, parent })
    setText('')
    console.log({ status })

    if (onPost) {
      onPost()
    }
  }

  if (status === 'loading') {
    return ''
  }

  return (
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className={(compact ? 'items-center' : '') + ' flex'}>
        <div className="">
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-2">
          <textarea
            className={
              (compact ? 'h-10 mt-1' : 'h-24') +
              ' w-full p-2 bg-transparent text-twitterWhite'
            }
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {!compact && (
            <div className="text-right border-t border-twitterBorder pt-2 pb-2">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">
                Tweet
              </button>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">
              Tweet
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
