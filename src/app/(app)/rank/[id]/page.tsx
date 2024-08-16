'use client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getEvent, getEventOrders } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
// import { Stat } from '../../home/page'
import { Divider } from '@/components/divider'
import { InstagramFeed } from '@/components/instagram-feed'
import { InstagramProfile } from '@/components/instagram-profile'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/http/apiClient'

export default function Rank({ params }: { params: { id: string } }) {
  const [rankData, setRankData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [profile, setProfile] = useState({});

  // if (!userAccount) {
  //   notFound()
  // }

  useEffect(() => {
    async function fetchData() {
    
        try {
          // const response = await api.get(`v1/adgenerator/google`)
          const { data } = await apiClient.get(`/v1/benchmark/instagram/profile/${params.id}`)
          console.log('PROFILE response', data)
          setGraphData(data?.orderedBycreatedAt || []) 
          setRankData(data?.orderedByScore || []) 
          setProfile(data?.profile || {}) 
 

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
       {console.log('rankData', rankData)}
      <InstagramFeed feed={rankData}/> 
      
      
    </>
  )
}
