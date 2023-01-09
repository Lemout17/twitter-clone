import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import useUserInfo from '../../../hooks/useUserInfo'

import PostContent from '../../../components/PostContent'
import Layout from '../../../components/Layout'
import PostForm from '../../../components/PostForm'
import TopNavLink from '../../../components/TopNavLink'

export default function PostPage() {
  const [post, setPost] = useState()
  const [replies, setReplies] = useState([])
  const [repliesLikedByMe, setRepliesLikedByMe] = useState([])
  const router = useRouter()
  const { id } = router.query
  const { userInfo } = useUserInfo()

  function fetchData() {
    axios.get('/api/posts?id=' + id).then((res) => setPost(res.data.post))

    axios.get('/api/posts?parent=' + id).then((res) => {
      setReplies(res.data.posts)
      setRepliesLikedByMe(res.data.idsLikedByMe)
    })
  }

  useEffect(() => {
    if (!id) {
      return
    }

    fetchData()
  }, [])

  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2">
          <TopNavLink />
          <PostContent {...post} big />
        </div>
      )}
      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5">
          <PostForm
            onPost={fetchData}
            compact
            parent={id}
            placeholder={'Tweet your reply'}
          />
        </div>
      )}
      <div className="border-t border-twitterBorder">
        {replies.length > 0 &&
          replies.map((reply) => (
            <div className="p-5 border-t border-twitterBorder">
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  )
}
