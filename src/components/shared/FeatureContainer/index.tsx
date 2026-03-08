import type { PropsWithChildren } from 'react'

export const FeatureContainer = (props: PropsWithChildren) => {
  return (
    <div className="no-scrollbar flex h-[calc(100vh-64px)] w-full flex-col gap-4 overflow-y-auto px-6 pt-6 pb-12 lg:gap-6">
      {props.children}
    </div>
  )
}
