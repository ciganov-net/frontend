import { PropsWithChildren } from 'react'

export const LayoutAdminContainer: React.FC<PropsWithChildren<unknown>> = ({
  children
}) => {
  return <main className={'mt-10'}>{children}</main>
}
