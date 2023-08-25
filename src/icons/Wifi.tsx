import React from 'react'

import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'

interface WifiProps {
  internet?: 'noWifi' | 'fast' | 'normal' | 'slow'
}

export const Wifi: IconProps<WifiProps> = ({ internet = 'fast', ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      opacity={internet !== 'fast' ? '0.2' : '1'}
      d='M15 10.36a12.29 12.29 0 0 1 8.576 3.51.436.436 0 0 0 .624-.004l1.666-1.722a.48.48 0 0 0-.005-.673 15.428 15.428 0 0 0-21.722 0 .48.48 0 0 0-.005.673L5.8 13.866c.172.177.45.179.624.005a12.29 12.29 0 0 1 8.577-3.51Z'
    />
    <path
      fill='currentColor'
      opacity={internet !== 'normal' && internet !== 'fast' ? '0.2' : '1'}
      d='M14.998 15.508c1.714 0 3.365.498 4.636 1.398a.527.527 0 0 0 .61-.006l1.624-1.284a.32.32 0 0 0 .132-.254.324.324 0 0 0-.139-.252c-3.867-2.813-9.856-2.813-13.723 0a.323.323 0 0 0-.138.252.32.32 0 0 0 .132.254L9.757 16.9a.527.527 0 0 0 .61.006c1.268-.899 2.92-1.397 4.631-1.397Z'
    />
    <path
      fill='currentColor'
      d='M17.878 19.251a.678.678 0 0 0 .122-.41.663.663 0 0 0-.134-.402c-1.654-1.919-4.077-1.919-5.732 0a.663.663 0 0 0-.134.402.678.678 0 0 0 .122.41l2.59 3.584A.36.36 0 0 0 15 23a.36.36 0 0 0 .288-.165l2.59-3.584Z'
      opacity={internet !== 'slow' && internet !== 'fast' && internet !== 'normal' ? '0.2' : '1'}
    />
  </Icon>
)
