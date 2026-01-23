import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'
import { AirpodLeftPath, AirpodRightPath } from './Airpod'

/** Airpods icon
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/Airpods.tsx
 */
export const Airpods: IconProps = ({ ...rest }) => (
  <Icon {...rest}>
    <path
      d={AirpodLeftPath}
      fill='currentColor'
      style={{ transform: 'translateX(6.5px)' }}
    />
    <path
      d={AirpodRightPath}
      fill='currentColor'
      style={{ transform: 'translateX(-6.5px)' }}
    />
  </Icon>
)
