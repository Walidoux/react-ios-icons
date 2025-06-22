import React from 'react'

import type { IconProps } from './IconProps'

interface IconWrapperProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Icon: IconProps<IconWrapperProps> = ({ children, ...rest }) => (
  <svg {...rest} width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
    {children}
  </svg>
)
