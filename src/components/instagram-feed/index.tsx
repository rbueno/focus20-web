/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DohoONX6Rms
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar } from "@/components/avatar"
// import { Button } from "@/components/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/card"
import Link from "next/link"
import { Heading, Subheading } from '@/components/heading'
import { Divider } from '@/components/divider'
import { Badge } from '@/components/badge'
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid"
import { FileVideo, SquareArrowOutUpRight } from 'lucide-react'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YnUn1ySQOjH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export function InstagramFeed({ feed }: { feed: any }) {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="flex flex-col gap-6 p-4 md:p-6">
        

<div>

        <Heading>Ranking</Heading>
      <Subheading>Lista de posts rankeados pela taxa de engajamento diário</Subheading>
</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {feed.map((content: any) => {
            return (<Card key={content.id} className="border-1 rounded-none shadow">
              <CardHeader className="grid">
              <div className="flex items-center w-full">
                <Badge color="violet">
                    {content.rank}º
                  </Badge>
                  <Badge className="ml-2" color="violet">
                    Score: {content.score}
                  </Badge>
                 
                  <div className="ml-auto">
                  <Link target="_blank" href={content.postUrl} className="text-violet-700">
                    <SquareArrowOutUpRight />
                  </Link>
                 
                    {/* <span className="sr-only">Comment</span> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent >
                {content.mediaType !== 'VIDEO' ? <img src={content.mediaUrl} width={400} height={400} alt="post cover" className="object-cover aspect-square" /> : (
                 
                 
<img src="/assets/instagram-video-placeholder.png" width={400} height={400} alt="post cover" className="object-cover aspect-square" /> 
                )}
                
              </CardContent>
              <CardFooter>
                <div className="text-sm w-full grid">
                    {content.caption.slice(0, 160)} {content.caption.length > 160 ? '...' : ''}
                  
                </div>
              </CardFooter>
            </Card>)
          })}
        </div>
      </div>
    </div>
  )
}
