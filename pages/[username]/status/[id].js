import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

import PostContent from '../../../components/PostContent'
import Layout from '../../../components/Layout'

export default function PostPage() {
  const [post, setPost] = useState()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get('/api/posts?id=' + id).then((res) => setPost(res.data.post))
  }, [])

  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2">
          <Link href={'/'}>
            <div className="flex mb-5 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Tweet
            </div>
          </Link>
          <PostContent {...post} big />
        </div>
      )}
    </Layout>
  )
}
