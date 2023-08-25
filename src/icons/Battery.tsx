import React from 'react'

import type { IconProps, Range } from '../IconProps'
import { Icon } from '../Icon'

interface BatteryProps {
  progression?: Range<101>
}

export const Battery: IconProps<BatteryProps> = ({ progression = 100, ...rest }) => (
  <Icon {...rest}>
    <path
      opacity='0.35'
      fill='currentColor'
      d='M6.825 21.296h13.782c1.6 0 2.856-.176 3.761-1.081.897-.905 1.064-2.145 1.064-3.744v-2.646c0-1.608-.167-2.848-1.064-3.744C23.454 9.176 22.206 9 20.607 9H6.799c-1.573 0-2.83.176-3.727 1.081C2.167 10.986 2 12.226 2 13.8v2.672c0 1.6.167 2.847 1.063 3.744.915.905 2.163 1.08 3.762 1.08Zm-.246-1.723c-.905 0-1.758-.131-2.25-.615-.492-.492-.606-1.327-.606-2.241v-3.12c0-.923.114-1.767.597-2.26.492-.491 1.354-.614 2.277-.614h14.256c.914 0 1.766.123 2.25.615.492.492.606 1.327.606 2.241v3.138c0 .914-.114 1.749-.606 2.241-.484.492-1.336.615-2.25.615H6.579Zm20.136-2.048c.73-.043 1.705-.975 1.705-2.381 0-1.398-.976-2.338-1.705-2.382v4.763Z'
    />

    <rect
      x='5'
      y='12'
      rx='1'
      height='6.25'
      width={(progression / 100) * 17.5}
      fill={progression <= 10 ? 'red' : progression <= 20 ? 'orange' : 'currentColor'}
    />
  </Icon>
)
