import { EllipsisLoader } from './elipsis-loader'

export const LoadingPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <EllipsisLoader />
    </div>
  )
}
