import type { PropsWithChildren } from 'react'

import { BubbleChat } from '../../src/icons/BubbleChat'

const IconConstraints: React.FC<PropsWithChildren> = ({ children }) => (
  <div className='relative border border-red-600/20'>
    <div className='absolute h-2 top-0 left-0 right-0 bg-blue-500/30' />
    <div className='absolute h-2 bottom-0 left-0 right-0 bg-blue-500/30' />
    {children}
  </div>
)

const Example = () => (
  <main className='flex min-h-screen w-screen items-center justify-center gap-4'>
    <IconConstraints>
      <BubbleChat />
    </IconConstraints>
  </main>
)

export default Example
