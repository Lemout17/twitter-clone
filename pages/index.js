import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import useUserInfo from '../hooks/useUserInfo'

import UsernameForm from '../components/UsernameForm'
import PostForm from '../components/PostForm'
import PostContent from '../components/PostContent'
import Layout from '../components/Layout'

export default function Home() {
  const { data: session } = useSession()
  const { userInfo, userInfoStatus, setUserInfo } = useUserInfo()
  const [posts, setPosts] = useState([])
  const [idsLikedByMe, setIdsLikedByMe] = useState([])
  const router = useRouter()

  function fetchHomePosts() {
    axios.get('api/posts').then((res) => {
      setPosts(res.data.posts)
      setIdsLikedByMe(res.data.idsLikedByMe)
    })
  }

  async function logout() {
    setUserInfo(null)
    await signOut()
  }

  useEffect(() => {
    if (!userInfo) {
      return
    }

    fetchHomePosts()
  }, [])

  if (userInfoStatus === 'loading') {
    return 'loading user info'
  }

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />
  }

  if (!userInfo) {
    console.log({ session })
    router.push('/login')
    return 'no user info'
  }

  console.log({ userInfo })

  return (
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={() => fetchHomePosts()} />
      <div className="">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id} className="border-t border-twitterBorder p-5">
              <PostContent
                {...post}
                likedByMe={idsLikedByMe.includes(post._id)}
              />
            </div>
          ))}
      </div>
      {userInfo && (
        <div className="p-5 text-center border-t border-twitterBorder">
          <button
            className="bg-twitterWhite text-black px-5 py-2 rounded-full"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </Layout>
  )
}
