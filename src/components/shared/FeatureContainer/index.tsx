import type { PropsWithChildren } from 'react'

export const FeatureContainer = (props: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:gap-6">
      {props.children}
    </div>
  )
}
