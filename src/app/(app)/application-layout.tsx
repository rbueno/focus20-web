'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { getEvents } from '@/data'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { CircleUser } from 'lucide-react'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  const router = useRouter()
  const handleSingOut = () => {
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('workspaceId')
    signOut({ callbackUrl: '/' })
  }

  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      {/* <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem> */}
      <DropdownDivider />
      <DropdownItem href="/auth/login">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel onClick={() => handleSingOut()}>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  events,
  user,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>
  user: any
  children: React.ReactNode
}) {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
  const email = localStorage.getItem('userEmail')
  setUserEmail(email || '---')

  },[])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                {/* <Avatar src="/users/erica.jpg" square /> */}
                <CircleUser className='h-6 w-6'/>
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
          {/* <div className="flex items-center justify-left">
      <div className="relative">
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#9F7AEA] bg-clip-text text-transparent font-['Poppins',sans-serif] font-bold text-4xl">
          Focus
          <span className="text-4xl">20</span>
        </div>
      </div>
    </div> */}
    <img src="/assets/logo.png" className='w-[80%]' alt='Focus20 logo' />
          </SidebarHeader>

          <SidebarFooter>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src={user?.image} className="size-10" square alt="" />
                  {/* <CircleUser className='h-6 w-6'/> */}
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{user?.name}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
