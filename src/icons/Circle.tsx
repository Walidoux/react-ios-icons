import { Icon } from '../Icon'
import type { FilledProp, IconProps } from '../IconProps'

/**
 * Circle icon with 2 variants
 * @param {boolean} [filled] - filled description
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/Circle.tsx
 */
export const Circle: IconProps<FilledProp> = ({ filled = false, ...rest }) => (
  <Icon {...rest}>
    <path
      d={
        filled
          ? 'M14.991 23.742c4.984 0 9.097-4.113 9.097-9.088 0-4.974-4.122-9.088-9.106-9.088-4.974 0-9.079 4.114-9.079 9.088 0 4.975 4.114 9.088 9.088 9.088Z'
          : 'M14.991 23.742c4.984 0 9.097-4.113 9.097-9.088 0-4.974-4.122-9.088-9.106-9.088-4.974 0-9.079 4.114-9.079 9.088 0 4.975 4.114 9.088 9.088 9.088Zm0-1.81a7.243 7.243 0 0 1-7.26-7.278 7.234 7.234 0 0 1 7.251-7.268 7.264 7.264 0 0 1 7.287 7.268 7.253 7.253 0 0 1-7.278 7.278Z'
      }
      fill='currentColor'
    />
  </Icon>
)
