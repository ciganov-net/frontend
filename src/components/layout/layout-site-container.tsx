import { PropsWithChildren } from 'react'

export const LayoutSiteContainer: React.FC<PropsWithChildren<unknown>> = ({
  children
}) => {
  return <main className={'mt-5 ml-40 flex-1 p-4'}>{children}</main>
}
