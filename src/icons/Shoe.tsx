import React from 'react'

import { Icon } from '../Icon'
import type { FilledProp, IconProps } from '../IconProps'

interface ShoeProps extends FilledProp {
  double?: boolean
}

export const Shoe: IconProps<ShoeProps & FilledProp> = ({ double = false, filled = false, ...rest }) => (
  <Icon {...rest}>
    {!double ? (
      <path
        fill='currentColor'
        d={
          !filled
            ? 'M14.4858 10.5546C12.9749 9.67025 11.5748 9.78976 10.4199 11.3036C9.51021 12.4748 8.5768 12.9768 7.61173 12.9768C6.75742 12.9768 6.17205 12.8413 5.53922 12.5465C4.32103 12.0127 3 12.5625 3 14.0205V17.5899C3 20.267 4.59789 21 6.12459 21H18.7099C21.2492 21 22.7205 20.6096 24.706 19.5021C26.2723 18.6177 27 17.5262 27 16.2673C27 14.4507 25.7422 13.2078 23.8912 13.2078C23.029 13.2078 21.091 13.5186 20.3632 13.5186C19.6354 13.5186 19.4773 13.4867 18.7258 13.0564L14.4858 10.5546ZM13.8372 11.6701L18.1009 14.156C19.058 14.7216 19.4931 14.8013 20.3632 14.8013C21.178 14.8013 23.1239 14.4906 23.8833 14.4906C25.1094 14.4906 25.7185 15.0881 25.7185 16.2673C25.7185 17.1119 25.2439 17.7413 24.089 18.3867C22.2854 19.3986 21.0831 19.7172 18.7099 19.7172H6.11668C4.96177 19.7172 4.27357 19.3348 4.27357 17.5899V14.0125C4.27357 13.6381 4.58998 13.5186 4.88266 13.662C5.65788 14.0046 6.49637 14.2595 7.61173 14.2595C8.94858 14.2595 10.317 13.5265 11.4245 12.0844C12.2076 11.0725 12.7298 11.0247 13.8372 11.6701ZM4.24192 18.6417C4.63744 18.8568 5.01714 18.9365 5.61042 18.9365H18.7099C20.7034 18.9365 21.7555 18.6656 23.0053 18.0043L24.4133 17.2872C25.7501 16.5861 25.7976 16.0841 25.7818 14.9208L24.9591 14.9049C25.4259 15.1917 25.2597 15.8212 23.9941 16.4984L22.586 17.2314C21.4865 17.821 20.6243 18.0441 18.7099 18.0441H5.61042C4.85893 18.0441 4.46342 17.9485 4.24192 17.7174V18.6417ZM14.5412 11.4072L13.141 13.3433C12.9987 13.5345 13.0145 13.8213 13.2044 13.9647C13.3863 14.1161 13.679 14.1002 13.8213 13.909L15.2294 11.9649L14.5412 11.4072ZM16.3368 12.3234L14.9525 14.2356C14.7944 14.4507 14.8102 14.7137 15.0079 14.8491C15.2136 15.0324 15.4825 15.0085 15.6408 14.7934L17.0171 12.8812L16.3368 12.3234ZM18.1088 13.2477L16.7561 15.128C16.5979 15.3351 16.6137 15.5981 16.8035 15.7415C17.0013 15.9168 17.2702 15.8929 17.4285 15.6857L18.7969 13.7974L18.1088 13.2477Z'
            : 'M5.04878 18.5293H18.8207C20.7983 18.5293 21.7 18.2903 22.8312 17.6845L25.1411 16.4571C26.4384 15.7558 26.7864 14.8472 26.1932 14.2096C25.7422 13.6756 24.9591 13.2054 23.8912 13.2054C23.029 13.2054 21.091 13.5162 20.3632 13.5162C19.857 13.5162 19.6275 13.5003 19.2478 13.3249L17.911 15.158C17.7528 15.3653 17.468 15.4051 17.2624 15.2218C17.0725 15.0704 17.0488 14.8074 17.207 14.5842L18.4331 12.8786L17.4443 12.2968L16.0679 14.2415C15.9018 14.4726 15.6249 14.4886 15.4113 14.2973C15.2136 14.1538 15.182 13.8908 15.3481 13.6597L16.6612 11.8346L15.6724 11.2528L14.1931 13.3249C14.0429 13.5242 13.7423 13.5401 13.5524 13.3887C13.3546 13.2373 13.3388 12.9344 13.4812 12.7431L14.8814 10.7825L14.4858 10.5514C12.967 9.6747 11.5748 9.78628 10.4199 11.3006C9.51021 12.4722 8.5768 12.9743 7.61173 12.9743C6.75742 12.9743 6.17205 12.8388 5.53922 12.5439C4.32103 12.0099 3 12.5598 3 14.0183V17.5889C3 17.6527 3 17.7164 3.00791 17.7722C3.50626 18.346 4.04417 18.5293 5.04878 18.5293ZM25.5603 17.2781L23.2663 18.4895C21.9611 19.1909 20.8853 19.4539 18.8207 19.4539H5.04878C4.32103 19.4539 3.75939 19.3422 3.1503 18.888C3.59328 20.5139 4.88266 21 6.12459 21H18.7099C21.2492 21 22.7205 20.6095 24.706 19.5017C26.2723 18.617 27 17.5251 27 16.2659C27 16.0985 26.9841 15.9391 26.9683 15.7877C26.8181 16.3934 26.4621 16.7919 25.5603 17.2781Z'
        }
      />
    ) : (
      <path
        fill='currentColor'
        d={
          !filled
            ? 'M5.69242 18.6307H6.67396V17.6243H5.6856C4.69043 17.6243 4.09742 17.3242 4.09742 15.9551V13.1483C4.09742 12.8545 4.37007 12.7607 4.62227 12.8732C5.29026 13.142 6.01278 13.3421 6.97387 13.3421C8.12582 13.3421 9.305 12.7669 10.2593 11.6354C10.9341 10.8415 11.384 10.804 12.3383 11.3104L16.0122 13.2608C16.837 13.7047 17.2119 13.7672 17.9617 13.7672C18.6637 13.7672 20.3405 13.5234 20.9949 13.5234C22.0514 13.5234 22.5762 13.9922 22.5762 14.9174C22.5762 15.1362 22.5149 15.3362 22.3854 15.5238H23.5783C23.6464 15.33 23.6805 15.1237 23.6805 14.9174C23.6805 13.4921 22.5967 12.5169 21.0017 12.5169C20.2588 12.5169 18.5888 12.7607 17.9617 12.7607C17.3346 12.7607 17.1983 12.7357 16.5507 12.3981L12.8972 10.4352C11.5953 9.74127 10.3888 9.83504 9.39365 11.0228C8.60977 11.9418 7.80546 12.3356 6.97387 12.3356C6.23772 12.3356 5.73332 12.2293 5.18802 11.998C4.13831 11.5792 3 12.0105 3 13.1545V15.9551C3 18.0556 4.37688 18.6307 5.69242 18.6307ZM5.24936 17.0117H6.67396V16.3115H5.24936C4.60182 16.3115 4.26101 16.2364 4.07015 16.0552V16.7803C4.41096 16.9491 4.73814 17.0117 5.24936 17.0117ZM16.2099 12.8045C14.908 12.1105 13.7084 12.2043 12.7063 13.3921C11.9224 14.311 11.1181 14.7049 10.2865 14.7049C9.5504 14.7049 9.0528 14.5986 8.50071 14.3673C7.45783 13.9485 6.31951 14.3798 6.31951 15.5238V18.3244C6.31951 20.4249 7.6964 21 9.01191 21H19.8498C22.0446 21 23.3056 20.6937 25.0165 19.8248C26.3729 19.1308 27 18.2744 27 17.2867C27 15.8614 25.9094 14.8862 24.3144 14.8862C23.5783 14.8862 21.9083 15.13 21.2744 15.13C20.6541 15.13 20.511 15.1049 19.8702 14.7674L16.2099 12.8045ZM15.6578 13.6796L19.3249 15.6301C20.1565 16.0739 20.5246 16.1364 21.2744 16.1364C21.9764 16.1364 23.6532 15.8926 24.3076 15.8926C25.3709 15.8926 25.8958 16.3677 25.8958 17.2867C25.8958 17.9494 25.48 18.4432 24.4916 18.9496C22.9307 19.7435 21.8947 19.9935 19.8498 19.9935H9.0051C8.00313 19.9935 7.41693 19.6935 7.41693 18.3244V15.5176C7.41693 15.2237 7.68958 15.13 7.94178 15.2425C8.60977 15.5113 9.32548 15.7114 10.2865 15.7114C11.4453 15.7114 12.6246 15.1362 13.5788 14.0047C14.2537 13.2108 14.7035 13.1733 15.6578 13.6796ZM7.38285 19.1496C7.73048 19.3184 8.05766 19.3809 8.56206 19.3809H19.8498C21.5743 19.3809 22.474 19.1683 23.5578 18.6495L24.7711 18.0869C25.9162 17.5367 25.9572 17.1429 25.9435 16.2302L25.2346 16.2177C25.6368 16.4428 25.5004 16.9366 24.4098 17.468L23.1897 18.0431C22.2423 18.5057 21.5061 18.6808 19.8498 18.6808H8.56206C7.92133 18.6808 7.58052 18.6058 7.38285 18.4244V19.1496ZM16.2644 13.4734L15.058 14.9924C14.9284 15.1425 14.9489 15.3675 15.1057 15.4801C15.2693 15.5988 15.5214 15.5863 15.6442 15.4363L16.8574 13.9109L16.2644 13.4734ZM17.8049 14.1923L16.612 15.6926C16.4757 15.8614 16.4962 16.0677 16.6598 16.174C16.8438 16.3177 17.0687 16.3052 17.2051 16.1302L18.3979 14.6299L17.8049 14.1923ZM19.3385 14.9174L18.1661 16.3927C18.0298 16.5553 18.0503 16.7616 18.207 16.8741C18.3843 17.0117 18.6092 16.9929 18.7455 16.8303L19.9316 15.3488L19.3385 14.9174Z'
            : 'M3.00682 16.0993C3.43624 16.5494 3.89975 16.6931 4.76541 16.6931H5.38569V15.5242C5.38569 13.8615 7.10338 12.8738 8.87563 13.5927C9.33909 13.7802 9.64585 13.8552 10.2865 13.8552C10.8864 13.8552 11.309 13.6427 11.9702 12.8676C12.829 11.8487 13.8514 11.4424 14.9216 11.5236L12.8972 10.436C11.5953 9.73588 10.3956 9.84215 9.39365 11.0236C8.60977 11.9424 7.80546 12.3363 6.97387 12.3363C6.23772 12.3363 5.73332 12.23 5.18802 11.9987C4.13831 11.5799 3 12.0112 3 13.1551V15.9806C3 16.0243 3 16.0618 3.00682 16.0993ZM5.38569 18.6059C5.38569 18.3246 5.38569 18.0496 5.38569 17.7746C5.38569 17.6558 5.38569 17.537 5.38569 17.4183C5.17438 17.4183 4.97671 17.4183 4.76541 17.4183C4.13831 17.4183 3.65436 17.3307 3.12951 16.9745C3.43624 17.9933 4.19966 18.4559 5.09941 18.5747C5.19483 18.5872 5.29026 18.5997 5.38569 18.6059ZM23.5374 14.074C23.2375 13.1801 22.2968 12.5175 21.0017 12.5175C20.1633 12.5175 18.8342 12.7426 17.9685 12.7613L20.4769 14.099C20.7154 14.2303 20.9131 14.2803 21.2744 14.2803C21.6833 14.2803 22.6922 14.1428 23.5374 14.074ZM8.07811 19.0622H19.9452C21.6561 19.0622 22.4263 18.8747 23.401 18.3996L25.3914 17.437C26.5161 16.8869 26.8092 16.1743 26.3048 15.6743C25.9162 15.2554 25.2414 14.8866 24.3144 14.8866C23.5783 14.8866 21.9083 15.1304 21.2744 15.1304C20.8381 15.1304 20.6404 15.1179 20.3201 14.9804L19.1614 16.4181C19.025 16.5869 18.7864 16.6119 18.6024 16.4681C18.4456 16.3494 18.4183 16.1431 18.5615 15.968L19.618 14.6303L18.766 14.174L17.5731 15.6992C17.43 15.8805 17.1983 15.893 17.0074 15.743C16.8438 15.6305 16.8097 15.4304 16.9597 15.243L18.0844 13.8115L17.2392 13.3552L15.9645 14.9804C15.835 15.1366 15.576 15.1492 15.4056 15.0304C15.242 14.9116 15.2283 14.6741 15.3511 14.5241L16.5575 12.9926L16.2099 12.8051C14.9011 12.1175 13.7084 12.205 12.7063 13.3927C11.9224 14.3115 11.1181 14.7054 10.2865 14.7054C9.5504 14.7054 9.0528 14.5991 8.50071 14.3678C7.45783 13.949 6.31951 14.3803 6.31951 15.5242V18.3246C6.31951 18.3747 6.31951 18.4246 6.31951 18.4684C6.75575 18.9185 7.21926 19.0622 8.07811 19.0622ZM25.7595 18.0809L23.7828 19.031C22.6513 19.5811 21.731 19.7873 19.9452 19.7873H8.07811C7.45101 19.7873 6.97387 19.6998 6.44902 19.3435C6.82392 20.6187 7.94178 21 9.01191 21H19.8498C22.0446 21 23.3056 20.6937 25.0165 19.8248C26.3729 19.131 27 18.2746 27 17.287C27 17.1557 26.9864 17.0307 26.9727 16.9119C26.8432 17.387 26.5365 17.6995 25.7595 18.0809Z'
        }
      />
    )}
  </Icon>
)