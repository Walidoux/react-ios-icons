type NumericRange<
  START extends number,
  END extends number,
  ARR extends unknown[] = [],
  ACC extends number = never
> = ARR['length'] extends END
  ? ACC | START | END
  : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

interface DefaultProps {
  filled?: boolean
  className?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type IconProps<T = {}, WithFillProperty = false> = React.FC<
  T & (WithFillProperty extends true ? DefaultProps : Omit<DefaultProps, 'filled'>)
>

export interface DisableProp {
  disabled?: boolean
}

export interface BatteryProps {
  progression?: NumericRange<0, 100>
}

export interface CellularProps {
  network?: 'noNetwork' | 'verySlow' | 'slow' | 'normal' | 'fast'
}

export interface WifiProps {
  internet?: 'noWifi' | 'fast' | 'normal' | 'slow'
}

export interface PhoneProps {
  isPutDown?: boolean
}

export interface SpeakerProps extends DisableProp {
  pitch?: 'high' | 'normal' | 'low' | 'idle'
}

export interface ChevronProps {
  direction?: 'up' | 'down' | 'left' | 'right'
}

export interface EyedropperProps {
  fillLevel?: 'half' | 'full' | 'empty'
}

export interface FlashLightProps {
  isOn?: boolean
}

export interface FolderProps {
  type?: 'add' | 'remove' | 'question' | 'user' | 'settings'
}

export interface GearProps {
  hasDouble?: boolean
}

export interface BellProps extends DisableProp {
  hasNotification?: boolean
}
