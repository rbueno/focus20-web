import React, { PropsWithChildren } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const loadingRoot = tv({
  base: 'animate-bounce rounded-full',
  variants: {
    color: {
      white: 'bg-white',
      black: 'bg-black',
    },
    size: {
      2: 'size-2',
      3: 'size-3',
      4: 'size-4',
      5: 'size-5',
      6: 'size-6',
      7: 'size-7',
    },
  },
  defaultVariants: {
    color: 'white',
    size: 2,
  },
})

type LoadingProps = PropsWithChildren<VariantProps<typeof loadingRoot>>

export const Loading: React.FC<LoadingProps> = ({ color, size }) => {
  const loadingClass = loadingRoot({ color, size })

  return (
    <div className="flex justify-center">
      <span className="sr-only">Loading...</span>
      <div className={`${loadingClass} [animation-delay:-0.3s]`} />
      <div className={`${loadingClass} [animation-delay:-0.15s]`} />
      <div className={`${loadingClass}`} />
    </div>
  )
}
