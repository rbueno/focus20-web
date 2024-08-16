'use client'
import { format, differenceInMinutes } from 'date-fns'
import { ChartBarBig, FileChartColumn, Lightbulb, Trash2 } from 'lucide-react'
import { Badge } from '@/components/badge'
// import { Button } from '@/components/button'
import { Button } from '@/components/ui/button'
import { Heading, Subheading } from '@/components/heading'
import { AddAccount } from '@/components/home/add-account'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion"
import { apiClient } from '@/lib/http/apiClient'
import { useEffect, useState } from 'react'


import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, FieldGroup, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonLeaderboard() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Generating the Leaderboard</h2>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">Please wait while the leaderboard is being generated.</p>
      </div>
    </div>
  )
}

export function DeleteAccount({ profileAccount, refreshRanking, ...props }: { profileAccount: any, refreshRanking: () => void } & React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteProfile = async () => {
    setIsDeleting(true)
    try {
      await apiClient.delete(`/v1/benchmark/instagram/${profileAccount.benchmarkProfileId}`)
      refreshRanking()
    } catch (error) {
      console.log(error)
    }
    setIsDeleting(false)
    setIsOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete Instagram</DialogTitle>
        <DialogDescription>
          Delete this Instagram account
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
          <Field>
            <ul role="list" className="divide-y divide-gray-100">
            <li className="flex items-center justify-between gap-x-6 py-5">
                
                    <div className="flex min-w-0 gap-x-4 w-[300px]">
                      <img alt="profile avatar" src={profileAccount.profile.avatarUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                      <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{profileAccount.profile.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">@{profileAccount.profile.username}</p>
                      </div>
                    </div>
          </li>
      </ul>
            </Field>
           
          
            
            
            
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button isLoading={isDeleting} onClick={() => deleteProfile()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


export function HomeDashBoard() {
  const router = useRouter()
  const [rankData, setRankData] = useState<any>({})
  const [isLoadingRanking, setIsLoadingRanking] = useState(false)

  const redirectAccount = async (accountId: string) => {
    router.push(`/insights/${accountId}`)
  }

  const refreshRanking = async () => {
    setIsLoadingRanking(true)

    try {
      const { data } = await apiClient.post(`v1/benchmark/instagram/ranking/refresh`)
      console.log('data refreshRanking', data)
      setRankData(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoadingRanking(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiClient.get(`/v1/benchmark/instagram/ranking`)
        console.log('data', data)
        const difference = differenceInMinutes(new Date(), new Date(data.updatedAt))
        console.log('difference', difference)
        console.log('difference', difference > 1)
        if (difference > 1) {
          await refreshRanking()
          return
        }
        setRankData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <Heading>Leaderboard</Heading>
      <Subheading>Ranking Instagram accounts</Subheading>
      
      {
        isLoadingRanking && (
          <div className='mt-8'>
            <SkeletonLeaderboard />
            </div>
        )
      }
        {rankData && !isLoadingRanking && (
          <div className='mt-6'>
            {rankData?.updatedAt && (
              <Subheading className='text-muted-foreground'>Last update: {format(new Date(rankData.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</Subheading>
            )}
            
            {!isLoadingRanking && rankData.ranking?.map((account: any) => (
                  <Accordion key={account.benchmarkProfileId} type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                      <div className="flex min-w-0 gap-x-4 w-full">
                                        <img alt="" src={account.profile.avatarUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                                        <div className="flex flex-col text-left">
                                          <p className="text-sm font-semibold leading-6 text-gray-900">{account.profile.name}</p>
                                          <div>


                                          <Badge color="violet" className="px-2 py-1 rounded-full text-primary-foreground flex">
                                      <div className="text-xs font-medium">{account.rank}º</div>
                                    </Badge>


                                    <Badge color="violet" className="ml-2 px-2 py-1 rounded-full text-primary-foreground flex">

                                      <div className="text-xs font-medium">Score: {account.score}</div>
                                  
                                    </Badge>

                                          </div>
                                        </div>
                                      </div>

                      </AccordionTrigger>
                      <AccordionContent>
                              {/* <ChevronRightIcon onClick={() => redirectAccount(person.id)} aria-hidden="true" className="h-5 w-5 flex-none text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" />
                        Yes. It adheres to the WAI-ARIA design pattern. */}
                        <Subheading>Insights</Subheading>
                        <div className='flex justify-between'>

                        <div>
                        <Button
                          // variant="outline"
                          icon={<ChartBarBig />}
                          // className="bg-lime-500 text-white w-auto"
                          onClick={() => router.push(`/rank/${account.benchmarkProfileId}`)}
                          >
                             Rank
                        </Button>

                        <Button
                          icon={<FileChartColumn />}
                          // variant="secondary"
                            className='ml-2'
                            onClick={() => router.push(`/content/${account.benchmarkProfileId}`)}>Posts
                          </Button>
                        <Button icon={<Lightbulb />} className='ml-2' onClick={() => router.push(`/generate/${account.benchmarkProfileId}`)}>New idea</Button>
                        </div>
                        <div>
                        {/* <Button variant="destructive" className='ml-2 bg-red-500 text-white w-auto' onClick={() => router.push(`/generate/${account.benchmarkProfileId}`)}><Trash2 /></Button> */}
                        <DeleteAccount refreshRanking={refreshRanking} icon={<Trash2 />} variant="destructive" className='ml-2' profileAccount={account} />
                        </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                                      
                            // </li>
                          ))}
          </div>
        )}
        
    {!isLoadingRanking && (
<div className='mt-10'>

      <AddAccount className="mt-4 w-full" isEmptyState={!rankData} refreshRanking={refreshRanking} >Add new account</AddAccount>
</div>

    )}
      
      

      
      
    </div>
  )
}
