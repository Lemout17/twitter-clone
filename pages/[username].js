import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout'
import TopNavLink from '../components/TopNavLink'
import Cover from '../components/Cover'
import Avatar from '../components/Avatar'

export default function UserPage() {
  const [profileInfo, setProfileInfo] = useState()
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    if (!username) {
      return
    }

    axios
      .get('/api/users?username=' + username)
      .then((res) => setProfileInfo(res.data.user))
  }, [username])

  return (
    <Layout>
      {!!profileInfo && (
        <div>
          <div className="px-5 py-2">
            <TopNavLink title={username} />
          </div>
          <Cover />
          <div className="flex justify-between">
            <div className="ml-5 relative">
              <div className="absolute -top-12 border-4 rounded-full border-black">
                <Avatar big src={profileInfo.image} />
              </div>
            </div>
            <div className="p-2">
              <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">
                Follow
              </button>
            </div>
          </div>
          <div className="px-5 mt-2">
            <h1 className="font-bold text-xl leading-5">{profileInfo.name}</h1>
            <h2 className="text-twitterLightGray text-sm">
              @{profileInfo.username}
            </h2>
            <div className="text-sm mt-2 mb-2">Bio here</div>
          </div>
        </div>
      )}
    </Layout>
  )
}