import { Icon } from '../Icon'
import type { IconProps } from '../IconProps'

interface AirpodGen3Props {
  direction?: 'left' | 'right'
}

export const AirpodLeftPath =
  'M14.123 7C11.898 7.01 10 8.851 10 11.31c0 2.552 3.6 5.619 6.264 5.628 1.926.01 4.263-1.88 4.263-4.207 0-2.814-3.46-5.75-6.404-5.73Zm.411 4.385c-.29.43-.87.514-1.3.205l-1.308-.925c-.43-.318-.514-.87-.187-1.3a.897.897 0 0 1 1.271-.224l1.31.944c.42.3.523.88.214 1.3Zm2.6 4.179c-.524 0-.543-.664-.038-1.505.505-.832 1.337-1.496 1.851-1.496.533 0 .56.663.047 1.496-.505.841-1.328 1.505-1.86 1.505Zm-3.47 8.096c.646 0 1.076-.355 1.076-.982v-5.001c-1.169-.337-2.328-1.02-3.3-1.88v6.881c0 .627.42.982 1.075.982h1.15Z'
export const AirpodRightPath =
  'M16.404 7C13.46 6.981 10 9.917 10 12.731c0 2.328 2.337 4.216 4.263 4.207 2.665-.01 6.264-3.076 6.264-5.628 0-2.459-1.898-4.3-4.123-4.31Zm-.411 4.385c-.3-.42-.206-1 .215-1.3l1.309-.944a.909.909 0 0 1 1.28.224.903.903 0 0 1-.196 1.3l-1.3.925c-.439.309-1.018.225-1.308-.205Zm-2.6 4.179c-.532 0-1.355-.664-1.86-1.505-.514-.832-.486-1.496.047-1.496.514 0 1.346.663 1.851 1.496.505.841.486 1.505-.037 1.505Zm3.479 8.096h1.15c.645 0 1.065-.355 1.065-.982v-6.88c-.972.86-2.131 1.542-3.3 1.879v5.001c0 .627.43.982 1.085.982Z'

/**
 * AirpodGen3 icon with 2 variants
 * @param {Direction} [direction="left"] - Direction of the Airpod icon (left or right)
 * @see https://github.com/Walidoux/react-ios-icons/blob/release/src/icons/AirpodGen3.tsx
 */
export const AirpodGen3: IconProps<AirpodGen3Props> = ({
  direction = 'left',
  ...rest
}) => (
  <Icon {...rest}>
    <path
      d={direction === 'left' ? AirpodLeftPath : AirpodRightPath}
      fill='currentColor'
    />
  </Icon>
)
