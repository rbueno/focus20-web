/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DohoONX6Rms
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/card"
import Link from "next/link"
import { Heading, Subheading } from '@/components/heading'
import { Divider } from '@/components/divider'
import { Badge } from '@/components/badge'
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid"
import Markdown from  'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Skeleton } from "../ui/skeleton"

const markdown = '# Hi, *Pluto*!'

export default function SkeletonText() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Creating the Analisys</h2>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">Please wait while the analisys is being created. It can take 1 minute</p>
      </div>
    </div>
  )
}

export function ContentInsight({ data }: { data: any }) {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="flex flex-col gap-6 p-4 md:p-6">
        

      

        <div>
          { data && <>
            <div>
              <Heading>Análise de conteúdo</Heading>
              <Subheading>Insights e feedbacks sobre os posts com maior engajamento.</Subheading>
            </div>

            <Card className="mt-4">
            <CardContent>
            <div className="mt-4 space-y-10">

            <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            >
              {data}
            </Markdown>
            </div>
            </CardContent>


            </Card>
            
          </>}

          {!data && <SkeletonText />}
         
        </div>
      </div>
    </div>
  )
}
