import React from 'react'

import type { IconProps } from './IconProps'

export const Icon: IconProps<{ children: React.ReactNode }> = ({ children, ...rest }) => (
  <svg {...rest} width='30' height='30' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
    {children}
  </svg>
)
