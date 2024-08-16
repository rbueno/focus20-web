'use client'

import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { apiClient } from '@/lib/http/apiClient'

import { PlusIcon } from '@heroicons/react/20/solid'
import { CircleUser, Instagram } from 'lucide-react'

export default function AddAccountEmptyState({ setIsOpen, ...props }: { setIsOpen: (value: boolean) => void } & React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <div className="text-center">
      <div
    
        className="flex items-center justify-center mx-auto h-12 w-12 text-gray-400"
      >
        <Instagram className='h-12 w-12'/>
        
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Instagram account</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a new Instagram account.</p>
      <div className="mt-6">
       

        <Button
        icon={<PlusIcon className="h-5 w-5" />}
        type="button" onClick={() => setIsOpen(true)} {...props}>
        
        Add Account
        </Button>

      </div>
    </div>
  )
}


export function AddAccount({ isEmptyState, refreshRanking, ...props }: { isEmptyState: boolean, refreshRanking: () => void } & React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [profileData, setProfileData] = useState<any>({})
  const [hasValidAccount, setHasValidAccount] = useState(false)
  const [isFindingProfile, setIsFindingProfile] = useState(false)
  const [isAddingProfile, setIsAddingProfile] = useState(false)

  const getProfile = async () => {
    setIsError(false)
    setIsFindingProfile(true)
    try {
      const parsedUsername = username.trim().startsWith('@') ? username.slice(1) : username
      const response = await apiClient.get(`/v1/benchmark/instagram/ig-profile/${parsedUsername}`)
      console.log('response ads', response.data)
      setProfileData(response.data)
      setHasValidAccount(true)
    } catch (error) {
      setIsError(true)
      console.log(error)
    }
    setIsFindingProfile(false)
  }

  const createProfile = async () => {
    setIsAddingProfile(true)
    try {
      await apiClient.post(`/v1/benchmark/instagram/ig-profile`, profileData)
      refreshRanking()
      setProfileData({})
    } catch (error) {
      setIsError(true)
      console.log(error)
    }
    setIsAddingProfile(false)
    setIsOpen(false)
  }

  return (
    <>
    { isEmptyState ? <AddAccountEmptyState setIsOpen={setIsOpen} /> : <Button type="button" onClick={() => setIsOpen(true)} {...props} />}
      
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Instagram</DialogTitle>
        <DialogDescription>
          Get insights of a new Instagram account
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
            {
              !hasValidAccount && (
                <Field>
                <Label>Insert Instagram @ profile</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value.trim())} name="account" placeholder="@insights.ai" autoFocus />
                {isError && (
                  <div className='m-2'>
                    <Text className='text-red-500 font-bold'>Invalid username. Only business accounts are allowed</Text>
                  </div>
                )}
            <Button isLoading={isFindingProfile} className='w-full' onClick={() => getProfile()}>Find profile</Button>
              </Field>
              )
            }
           
           {
            hasValidAccount && (
              <Field>
            <ul role="list" className="divide-y divide-gray-100">
            <li className="flex items-center justify-between gap-x-6 py-5">
                
                    <div className="flex min-w-0 gap-x-4 w-[300px]">
                      <img alt="profile avatar" src={profileData.profile_picture_url} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                      <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{profileData.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">@{profileData.username}</p>
                      </div>
                    </div>
                  
            
            {/* <a
              href={person.href}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View
            </a> */}
            <XCircleIcon onClick={() => setHasValidAccount(false)} aria-hidden="true" className="h-5 w-5 flex-none rounded-full text-red-400 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50" />
          </li>
      </ul>
            </Field>
            )
           }
            
            
            
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button isLoading={isAddingProfile} disabled={!hasValidAccount} onClick={() => createProfile()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
