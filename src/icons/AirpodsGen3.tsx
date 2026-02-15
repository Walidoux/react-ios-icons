import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'
import { AirpodLeftPath, AirpodRightPath } from './AirpodGen3'

/** AirpodsGen3 icon
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/AirpodsGen3.tsx
 */
export const AirpodsGen3: IconProps = ({ ...rest }) => (
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
