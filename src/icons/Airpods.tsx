import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'
import { AirpodLeftPath, AirpodRightPath } from './Airpod'

/** Airpods icon
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/Airpods.tsx
 */
export const Airpods: IconProps = ({ ...rest }) => (
  <Icon {...rest}>
    <path d={AirpodLeftPath} style={{ transform: 'translateX(6.5px)' }} fill='currentColor' />
    <path d={AirpodRightPath} style={{ transform: 'translateX(-6.5px)' }} fill='currentColor' />
  </Icon>
)
