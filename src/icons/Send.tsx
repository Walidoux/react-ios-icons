import React from 'react'

import { Icon } from '../Icon'
import type { FilledProp, IconProps } from '../IconProps'

export const Send: IconProps<FilledProp> = ({ filled = false, ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      d={
        !filled
          ? 'M15.3359 23.4805C16.0215 23.4805 16.4961 22.9268 16.8213 22.083L22.6221 6.91309C22.7715 6.51758 22.8594 6.1748 22.8594 5.87598C22.8594 5.25195 22.4639 4.85645 21.8311 4.85645C21.541 4.85645 21.1895 4.93555 20.8027 5.08496L5.5625 10.9209C4.80664 11.2109 4.23535 11.6855 4.23535 12.3711C4.23535 13.2148 4.85938 13.5312 5.7207 13.7861L12.0664 15.6494L13.9121 21.9248C14.1758 22.8213 14.4922 23.4805 15.3359 23.4805ZM12.5762 14.0322L7.11816 12.3623C6.98633 12.3271 6.95117 12.2832 6.95117 12.2305C6.95117 12.1689 6.98633 12.1162 7.10059 12.0811L17.5332 8.09082C18.2803 7.80078 19.0098 7.44922 19.8096 7.08008C19.1768 7.58984 18.4033 8.21387 17.876 8.74121L12.5762 14.0322ZM15.4941 20.7734C15.4326 20.7734 15.3887 20.7207 15.3535 20.5977L13.6836 15.1396L18.9746 9.83984C19.4844 9.32129 20.1348 8.52148 20.6445 7.87988C20.2754 8.68848 19.915 9.42676 19.625 10.1826L15.6348 20.6152C15.5908 20.7295 15.5557 20.7734 15.4941 20.7734Z'
          : 'M15.3359 23.4102C16.0215 23.4102 16.4961 22.8564 16.8213 22.0127L22.6221 6.83398C22.7715 6.44727 22.8594 6.10449 22.8594 5.80566C22.8594 5.18164 22.4639 4.78613 21.8311 4.78613C21.541 4.78613 21.1895 4.86523 20.8027 5.01465L5.5625 10.8506C4.80664 11.1406 4.23535 11.6152 4.23535 12.3008C4.23535 13.1357 4.85938 13.4521 5.7207 13.7158L10.2734 15.1045C10.8887 15.2979 11.249 15.2891 11.6797 14.8848L21.4707 5.81445C21.5938 5.7002 21.7432 5.71777 21.8398 5.80566C21.9365 5.89355 21.9365 6.05176 21.8311 6.16602L12.7783 15.9746C12.4092 16.3877 12.374 16.7744 12.5586 17.3896L13.9121 21.8545C14.1758 22.751 14.4922 23.4102 15.3359 23.4102Z'
      }
    />
  </Icon>
)
