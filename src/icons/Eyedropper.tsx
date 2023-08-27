import React from 'react'

import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'

interface EyedropperProps {
  fillLevel?: 'half' | 'full' | 'empty'
}

export const Eyedropper: IconProps<EyedropperProps> = ({ fillLevel = 'empty', ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      d='m19.947 15.387.288-.3c.493-.524.512-1.151-.019-1.685l-.26-.262c1.479-1.301 3.07-1.442 4.11-2.49 1.433-1.46 1.052-3.566-.036-4.67-1.088-1.115-3.172-1.47-4.642-.038-1.06 1.03-1.18 2.649-2.483 4.128l-.25-.262c-.522-.534-1.154-.515-1.675-.01l-.307.29c-.614.58-.52 1.133.028 1.685l.372.384-6.827 6.88C5.26 22.042 6.47 21.94 5 23.99L5.94 25c1.99-1.479 2.055-.131 5.068-3.145l6.874-6.88.39.383c.55.553 1.089.646 1.675.029Zm-11.84 6.655c-.307-.337-.252-.665.093-1.01l7.83-7.91.931.926-7.869 7.91c-.307.309-.697.402-.985.084Z'
    />
    <rect
      x={-10}
      y={20}
      height={2}
      style={{ rotate: '-45deg' }}
      width={fillLevel === 'full' ? 10 : fillLevel === 'half' ? 5 : 0}
      fill='currentColor'
    />
  </Icon>
)
