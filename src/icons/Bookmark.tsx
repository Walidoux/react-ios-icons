import React from 'react'

import type { FilledProp, IconProps } from '../IconProps'
import { Icon } from '../Icon'

export const Bookmark: IconProps<FilledProp> = ({ filled = false, ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      d={`M10.151 24.292c.475 0 .783-.246 1.53-.976l3.392-3.357c.035-.044.114-.044.15 0l3.401 3.357c.747.73 1.046.976 1.53.976.702 0 1.142-.483 1.142-1.274V7.672c0-1.75-.914-2.672-2.646-2.672h-7.004C9.914 5 9 5.923 9 7.672v15.346c0 .79.44 1.274 1.151 1.274Z ${
        !filled
          ? 'm.835-2.892c-.114.115-.255.08-.255-.087V7.786c0-.703.352-1.046 1.055-1.046h6.724c.703 0 1.054.343 1.054 1.046v13.527c0 .167-.131.202-.255.087l-3.577-3.462c-.369-.37-.79-.37-1.169 0L10.986 21.4Z'
          : ''
      }`}
    />
  </Icon>
)
