import type React from 'react'

import type { IconProps } from './IconProps'

interface IconWrapperProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Icon: IconProps<IconWrapperProps> = ({ children, ...rest }) => (
  <svg
    {...rest}
    fill="none"
    height="30"
    viewBox="0 0 30 30"
    width="30"
    xmlns="http://www.w3.org/2000/svg">
    <title>Icon</title>
    {children}
  </svg>
)
