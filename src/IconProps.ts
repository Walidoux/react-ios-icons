export type Range<T extends number> = number extends T ? number : _Range<T, []>
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>

interface DefaultProps {
  className?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type IconProps<T = {}> = React.FC<T & DefaultProps>

export interface FilledProp {
  filled?: boolean
}

export interface DisableProp {
  disabled?: boolean
}
