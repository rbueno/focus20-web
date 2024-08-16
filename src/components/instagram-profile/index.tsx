/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DohoONX6Rms
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar } from "@/components/avatar"
import { Badge } from "../badge"

export function Profile({ profile }: { profile: any }) {
    return (
        <div className="flex min-w-0 gap-x-4 w-[300px]">
        <img alt="avatar" src={profile.avatarUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
        <div className="min-w-0 flex-auto">
          <p className="text-lg font-semibold leading-6 text-gray-900">{profile.name}</p>
          <p className="text-sm font-semibold leading-6 text-gray-900">@{profile.username}</p>
          {/* <div>
            <Badge color={'lime'} className="px-2 py-1 rounded-full bg-primary text-primary-foreground flex items-center">
              <div className="text-xs font-medium">1º</div>
            </Badge>
            <Badge color={'lime'} className="ml-2 px-2 py-1 rounded-full bg-primary text-primary-foreground flex items-center">
              <div className="text-xs font-medium">Score: 3.59</div>
            </Badge>
          </div> */}
        </div>
      </div>
    )
}
export function InstagramProfile({ profile }: { profile: any }) {
  return (
    <div className="w-full max-w-[800px] mx-auto">

      <div className="flex flex-col gap-6 p-4 md:p-6">
        <Profile profile={profile} />

          {/* <div className="flex flex-col gap-1">
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <div>
                <span className="font-semibold">100</span> posts
              </div>
              <div>
                <span className="font-semibold">1.2K</span> followers
              </div>
              <div>
                <span className="font-semibold">300</span> following
              </div>
            </div>
            <div className="text-sm">Vercel open-source design system and component library.</div>
          </div> */}


      </div>
    </div>
  )
}
