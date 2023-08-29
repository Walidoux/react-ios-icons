import React from 'react'

import type { IconProps } from '../IconProps'
import { Icon } from '../Icon'

interface FlashLightProps {
  isOn?: boolean
}

export const Flashlight: IconProps<FlashLightProps> = ({ isOn = false, ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      d='M10 7.33h9.246v-.51c0-1.205-.624-1.82-1.784-1.82h-5.678C10.624 5 10 5.615 10 6.82v.51Zm3.577 17.691h2.092c1.16 0 1.775-.606 1.775-1.819v-9.097c0-.887.203-1.529.537-2.03l.553-.835c.44-.677.712-1.292.712-2.056V8.48H10v.704c0 .764.264 1.38.703 2.056l.563.835c.325.501.527 1.143.527 2.03v9.097c0 1.213.624 1.82 1.784 1.82Zm1.046-11.715c.756 0 1.248.545 1.248 1.327v2.426c0 .764-.492 1.292-1.248 1.3-.756.018-1.248-.518-1.248-1.3v-2.426c0-.782.492-1.327 1.248-1.327Z'
    />
    <circle cx={14.6} cy={isOn ? 14.6 : 17} r={1} fill='currentColor' />
  </Icon>
)
