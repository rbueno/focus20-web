'use client'
import { Link } from '@/components/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { InstagramProfile } from '@/components/instagram-profile'
import { ContentInsight } from '@/components/content-insight'
import { useState, useEffect} from 'react'
import { apiClient } from '@/lib/http/apiClient'


export default function Event({ params }: { params: { id: string } }) {
  const [contentAnalysis, setContentAnalysis] = useState(null);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function fetchData() {
      
        try {
          const { data } = await apiClient.get(`/v1/benchmark/instagram/profile/${params.id}`)
          console.log('PROFILE response', data)
          setProfile(data?.profile || {}) 
          const fetchResponse = async (id: any, delay = 15000) => {
            await new Promise((resolve) => setTimeout(resolve, delay))
            const contentAnalyticsResponse = await apiClient.get(`/v1/benchmark/instagram/contentAnalytics/${id}`)
            console.log('contentAnalyticsResponse', contentAnalyticsResponse.data)
            if (contentAnalyticsResponse.data.status === 'done') return contentAnalyticsResponse.data
             return fetchResponse(id, 9000)
          }
          const responseContentAnalytics =  await fetchResponse(params.id, 100)

          setContentAnalysis(responseContentAnalytics.contentAnalytic.postAnalytic)

        } catch (error) {
          console.log(error)
        }
     
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Leaderboard
        </Link>
      </div>

      <InstagramProfile profile={profile} />
      <ContentInsight data={contentAnalysis}/>
      
      
    </>
  )
}
