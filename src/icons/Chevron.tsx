import React from 'react'
import classNames from 'clsx'

import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'

interface ChevronProps {
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const Chevron: IconProps<ChevronProps> = ({ className, direction = 'up', ...rest }) => (
  <Icon
    {...rest}
    className={classNames(className, {
      'rotate-180': direction === 'up',
      'rotate-90': direction === 'left',
      '-rotate-90': direction === 'right'
    })}>
    <path
      fill='currentColor'
      d='M14.796 19.982c.308-.008.589-.123.817-.369l6.68-6.838c.193-.193.299-.44.299-.73 0-.58-.457-1.045-1.037-1.045-.282 0-.554.114-.756.316l-5.994 6.161-6.012-6.16A1.094 1.094 0 0 0 8.037 11C7.457 11 7 11.466 7 12.046a1 1 0 0 0 .299.73l6.688 6.837c.238.246.501.37.809.37Z'
    />
  </Icon>
)
