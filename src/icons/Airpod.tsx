import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'

interface AirPodProps {
  direction?: 'left' | 'right'
}

/**
 * Airpod icon with 2 variants
 * @param {Direction} [direction="left"] - Direction of the Airpod icon (left or right)
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/Airpod.tsx
 */
export const Airpod: IconProps<AirPodProps> = ({
  direction = 'left',
  ...rest
}) => (
  <Icon {...rest}>
    <path
      d='M11.302 12.8c-1.248-.011-2.08-.75-2.478-1.365a1.17 1.17 0 0 1-.188-.656v-.873c0-.246.059-.463.188-.662.422-.621 1.236-1.365 2.478-1.365 1.418 0 2.602 1.107 2.625 2.455.018 1.365-1.2 2.484-2.625 2.467m6.604 0c-1.418.018-2.643-1.1-2.62-2.466.018-1.348 1.202-2.455 2.62-2.455 1.248 0 2.057.744 2.478 1.365.135.2.188.416.188.662v.873c0 .24-.059.457-.188.656a2.98 2.98 0 0 1-2.478 1.366M9.79 11.319c.17 0 .298-.129.298-.299V9.66a.29.29 0 0 0-.298-.293.29.29 0 0 0-.293.293v1.36c0 .17.129.298.293.298m9.627 0a.29.29 0 0 0 .293-.299V9.66a.29.29 0 0 0-.293-.293.29.29 0 0 0-.3.293v1.36c0 .17.13.298.3.298m-7.875 6.27v-4.172a3.3 3.3 0 0 0 1.793-.668v4.84zm6.123 0h-1.793v-4.84c.51.387 1.125.621 1.793.668zm-5.479 1.998c-.387 0-.644-.205-.644-.586v-.768h1.793V19c0 .38-.247.586-.645.586zm4.834 0h-.504c-.392 0-.644-.205-.644-.586v-.768h1.793V19c0 .38-.258.586-.645.586'
      fill='currentColor'
    />
  </Icon>
)
