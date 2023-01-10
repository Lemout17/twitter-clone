import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useUserInfo from '../hooks/useUserInfo'

import Layout from '../components/Layout'
import TopNavLink from '../components/TopNavLink'
import Cover from '../components/Cover'
import Avatar from '../components/Avatar'
import PostContent from '../components/PostContent'

export default function UserPage() {
  const router = useRouter()
  const { username } = router.query
  const { userInfo } = useUserInfo()
  const [profileInfo, setProfileInfo] = useState()
  const [originalUserInfo, setOriginalUserInfo] = useState()
  const [posts, setPosts] = useState([])
  const [postsLikedByMe, setPostsLikedByMe] = useState([])
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (!username) {
      return
    }

    axios.get('/api/users?username=' + username).then((res) => {
      setProfileInfo(res.data.user)
      setOriginalUserInfo(res.data.user)
    })
  }, [username])

  useEffect(() => {
    if (!profileInfo?._id) {
      return
    }
    axios.get('/api/posts?author=' + profileInfo._id).then((response) => {
      setPosts(response.data.posts)
      setPostsLikedByMe(response.data.idsLikedByMe)
    })
  }, [profileInfo])

  function updateUserImage(type, src) {
    setProfileInfo((prev) => ({ ...prev, [type]: src }))
  }

  async function updateUserProfile() {
    const { bio, name, username } = profileInfo
    await axios.put('/api/profile', {
      bio,
      name,
      username,
    })

    setEditMode(false)
  }

  function cancel() {
    setProfileInfo((prev) => {
      const { bio, name, username } = originalUserInfo
      return { ...prev, bio, name, username }
    })

    setEditMode(false)
  }

  const isMyProfile = profileInfo?._id === userInfo?._id

  return (
    <Layout>
      {!!profileInfo && (
        <div>
          <div className="px-5 py-2">
            <TopNavLink title={username} />
          </div>
          <Cover
            src={profileInfo.cover}
            onChange={(src) => updateUserImage('cover', src)}
            editable={isMyProfile}
          />
          <div className="flex justify-between">
            <div className="ml-5 relative">
              <div className="absolute -top-12 border-4 rounded-full border-black overflow-hidden">
                <Avatar
                  big
                  src={profileInfo.image}
                  editable={isMyProfile}
                  onChange={(src) => updateUserImage('image', src)}
                />
              </div>
            </div>
            <div className="p-2">
              {!isMyProfile && (
                <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">
                  Follow
                </button>
              )}

              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                      onClick={() => {
                        setEditMode(true)
                      }}
                    >
                      Edit profile
                    </button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        className="bg-twitterWhite text-black py-2 px-5 rounded-full mr-2"
                        onClick={() => cancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                        onClick={() => {
                          updateUserProfile()
                        }}
                      >
                        Save profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="px-5 mt-2">
            {!editMode && (
              <h1 className="font-bold text-xl leading-5">
                {profileInfo.name}
              </h1>
            )}

            {editMode && (
              <div>
                <input
                  className="bg-twitterBorder p-2 mb-1 rounded-full"
                  type="text"
                  value={profileInfo.name}
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            {!editMode && (
              <h2 className="text-twitterLightGray text-sm">
                @{profileInfo.username}
              </h2>
            )}

            {editMode && (
              <div>
                <input
                  className="bg-twitterBorder p-2 mb-1 rounded-full"
                  type="text"
                  value={profileInfo.username}
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            {!editMode && (
              <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
            )}

            {editMode && (
              <div>
                <textarea
                  value={profileInfo.bio}
                  className="bg-twitterBorder p-2 mb-2 rounded-2xl w-full block"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
      {posts?.length > 0 &&
        posts.map((post) => (
          <div className="p-5 border-t border-twitterBorder" key={post._id}>
            <PostContent
              {...post}
              likedByMe={postsLikedByMe.includes(post._id)}
            />
          </div>
        ))}
    </Layout>
  )
}
