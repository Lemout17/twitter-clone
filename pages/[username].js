import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout'
import TopNavLink from '../components/TopNavLink'

export default function UserPage() {
  const [profileInfo, setProfileInfo] = useState()
  const router = useRouter()
  const { username } = router.query

  //   useEffect(() => {
  //     if (!username) {
  //       return
  //     }

  //     axios
  //       .get('/api/users?username=' + username)
  //       .then((res) => setProfileInfo(res.data.user))
  //   }, [username])

  return (
    <Layout>
      <div className="px-5 py-2">
        <TopNavLink title={username} />
      </div>
      {username}
    </Layout>
  )
}
