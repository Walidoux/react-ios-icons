import React from 'react'

import type { DisableProp, FilledProp, IconProps } from '../IconProps'
import { Icon } from '../Icon'

interface BellProps extends FilledProp, DisableProp {
  hasNotification?: boolean
}

export const Bell: IconProps<BellProps> = ({ filled = false, hasNotification = false, disabled = false, ...rest }) => (
  <Icon {...rest}>
    {!hasNotification && !disabled && (
      <path
        fill='currentColor'
        d={
          !filled
            ? 'M6.9248 19.5781H10.5459C10.6074 21.248 11.9785 22.7949 14 22.7949C16.0127 22.7949 17.3926 21.2656 17.4629 19.5781H21.0752C21.9893 19.5781 22.5518 19.0771 22.5518 18.3213C22.5518 17.3809 21.6992 16.5811 20.8994 15.8164C20.2754 15.21 20.126 13.9971 20.0117 12.7578C19.8887 9.44434 18.9131 7.22949 16.6279 6.40332C16.2852 5.23438 15.3096 4.34668 14 4.34668C12.6904 4.34668 11.7148 5.23438 11.3809 6.40332C9.08691 7.22949 8.12012 9.44434 7.98828 12.7578C7.87402 13.9971 7.72461 15.21 7.10059 15.8164C6.30078 16.5811 5.44824 17.3809 5.44824 18.3213C5.44824 19.0771 6.01074 19.5781 6.9248 19.5781ZM7.59277 17.9434V17.8379C7.82129 17.583 8.33105 17.1172 8.76172 16.625C9.36816 15.9307 9.64941 14.6475 9.7373 12.9775C9.84277 9.45312 10.9326 8.2666 12.3389 7.88867C12.5586 7.82715 12.6729 7.72168 12.6904 7.48438C12.7344 6.59668 13.2354 5.99902 14 5.99902C14.7734 5.99902 15.2656 6.59668 15.3096 7.48438C15.3271 7.72168 15.4502 7.82715 15.6611 7.88867C17.0762 8.2666 18.1572 9.45312 18.2627 12.9775C18.3594 14.6475 18.6406 15.9307 19.2383 16.625C19.6689 17.1172 20.1611 17.583 20.3896 17.8379V17.9434H7.59277ZM14 21.3799C13.0068 21.3799 12.2949 20.668 12.2334 19.5781H15.7754C15.7227 20.6592 15.002 21.3799 14 21.3799Z'
            : 'M6.96875 19.4639H21.0225C21.9277 19.4639 22.4814 18.9717 22.4814 18.2334C22.4814 17.3018 21.6377 16.502 20.8467 15.7461C20.2227 15.1396 20.082 13.874 19.9678 12.7051C19.8271 9.48828 18.8867 7.2207 16.6104 6.40332C16.25 5.24316 15.292 4.34668 13.9912 4.34668C12.6992 4.34668 11.7412 5.24316 11.3721 6.40332C9.10449 7.2207 8.15527 9.48828 8.02344 12.7051C7.90918 13.874 7.75977 15.1396 7.14453 15.7461C6.35352 16.502 5.50977 17.3018 5.50977 18.2334C5.50977 18.9717 6.06348 19.4639 6.96875 19.4639ZM13.9912 23.085C15.5557 23.085 16.6895 21.9688 16.8037 20.6943H11.1875C11.3018 21.9688 12.4355 23.085 13.9912 23.085Z'
        }
      />
    )}

    {!hasNotification && disabled && (
      <path
        fill='currentColor'
        d={
          !filled
            ? 'M10.1592 7.05371L11.416 8.31055C11.6973 8.1084 12.0049 7.97656 12.3301 7.88867C12.5498 7.82715 12.6729 7.72168 12.6904 7.48438C12.7344 6.59668 13.2266 5.99902 13.9912 5.99902C14.7646 5.99902 15.2568 6.59668 15.3008 7.48438C15.3184 7.72168 15.4414 7.82715 15.6523 7.88867C17.085 8.27539 18.1924 9.49707 18.2803 13.1621C18.3418 14.1729 18.4297 14.8584 18.6934 15.4824L22.209 19.0684C22.4023 18.8574 22.5166 18.5762 22.5166 18.2598C22.5166 17.46 21.7959 16.7656 21.1016 16.1152C20.3633 15.3418 20.126 14.4453 20.0293 13.0039C19.9238 9.4707 18.9219 7.22949 16.6191 6.40332C16.2852 5.23438 15.3008 4.34668 13.9912 4.34668C12.6816 4.34668 11.7061 5.23438 11.3721 6.40332C10.915 6.56152 10.5107 6.78125 10.1592 7.05371ZM5.79102 6.22754L21.7695 22.1885C22.042 22.4697 22.499 22.4697 22.7627 22.1885C23.0264 21.916 23.0352 21.4766 22.7627 21.2041L6.78418 5.23438C6.51172 4.96191 6.06348 4.96191 5.79102 5.23438C5.51855 5.49805 5.51855 5.96387 5.79102 6.22754ZM13.9912 22.7949C15.8721 22.7949 17.208 21.4414 17.4189 19.8594H17.8848L15.96 17.9434H7.58398V17.8379C7.8125 17.583 8.32227 17.1172 8.75293 16.625C9.33301 15.9658 9.61426 14.8496 9.69336 13.25C9.71094 12.7139 9.75488 12.2305 9.81641 11.791L8.27832 10.2529C8.10254 10.9824 8.01465 11.8262 7.97949 12.7578C7.86523 13.9971 7.72461 15.21 7.0918 15.8164C6.29199 16.5811 5.43945 17.3809 5.43945 18.3213C5.43945 19.0771 6.00195 19.5781 6.9248 19.5781H10.5371C10.6074 21.2568 11.9873 22.7949 13.9912 22.7949ZM13.9912 21.3799C13.0068 21.3799 12.2861 20.668 12.2246 19.5781H15.7666C15.7051 20.668 14.9844 21.3799 13.9912 21.3799Z'
            : 'M13.9824 4.34668C12.6816 4.34668 11.7236 5.24316 11.3633 6.40332C10.915 6.56152 10.5107 6.77246 10.168 7.04492L22.1475 19.042C22.3584 18.8486 22.4639 18.5674 22.4639 18.2334C22.4639 17.3018 21.6201 16.502 20.8291 15.7461C20.2139 15.1396 20.0645 13.874 19.9502 12.7051C19.8184 9.48828 18.8691 7.2207 16.6016 6.40332C16.2324 5.24316 15.2744 4.34668 13.9824 4.34668ZM21.7695 22.1885C22.042 22.4697 22.499 22.4697 22.7627 22.1885C23.0264 21.916 23.0352 21.4766 22.7627 21.2041L6.78418 5.23438C6.51172 4.96191 6.06348 4.96191 5.79102 5.23438C5.51855 5.49805 5.51855 5.96387 5.79102 6.22754L21.7695 22.1885ZM6.95117 19.4639H17.4893L8.2959 10.2617C8.12891 10.9912 8.03223 11.7998 8.00586 12.7051C7.8916 13.874 7.75098 15.1396 7.12695 15.7461C6.33594 16.502 5.49219 17.3018 5.49219 18.2334C5.49219 18.9717 6.0459 19.4639 6.95117 19.4639ZM13.9824 23.085C15.5381 23.085 16.6719 21.9688 16.7861 20.6943H11.1699C11.2842 21.9688 12.4268 23.085 13.9824 23.085Z'
        }
      />
    )}

    {hasNotification && (
      <path
        fill='currentColor'
        d={
          !filled
            ? 'M6.9248 19.5781H10.5459C10.6074 21.248 11.9785 22.7949 14 22.7949C16.0127 22.7949 17.3926 21.2568 17.4629 19.5781H21.0752C21.9893 19.5781 22.5518 19.0771 22.5518 18.3213C22.5518 17.3809 21.6992 16.5811 20.8994 15.8164C20.2842 15.21 20.1436 14.0146 20.0205 12.8193C20.0117 12.3271 19.9766 11.8613 19.9238 11.4131C19.3965 11.6328 18.7373 11.7207 18.1748 11.6416C18.2188 12.0459 18.2539 12.4766 18.2627 12.9775C18.3506 14.6475 18.6406 15.9307 19.2383 16.625C19.6689 17.1172 20.1611 17.583 20.3896 17.8379V17.9434H7.59277V17.8379C7.82129 17.583 8.33105 17.1172 8.76172 16.625C9.36816 15.9307 9.64941 14.6475 9.7373 12.9775C9.84277 9.45312 10.9238 8.25781 12.3389 7.88867C12.5586 7.82715 12.6729 7.72168 12.6904 7.48438C12.7432 6.59668 13.2354 5.99902 14 5.99902C14.1494 5.99902 14.2812 6.0166 14.4043 6.06055C14.5625 5.52441 14.8438 5.04102 15.2129 4.63672C14.8525 4.45215 14.4482 4.34668 14 4.34668C12.6904 4.34668 11.7148 5.23438 11.3809 6.40332C9.08691 7.22949 8.12012 9.44434 7.98828 12.7578C7.87402 13.9971 7.72461 15.21 7.10059 15.8164C6.30078 16.5811 5.44824 17.3809 5.44824 18.3213C5.44824 19.0771 6.01074 19.5781 6.9248 19.5781ZM18.3945 10.499C20.0469 10.499 21.4268 9.12793 21.4268 7.4668C21.4268 5.80566 20.0469 4.43457 18.3945 4.43457C16.7334 4.43457 15.3623 5.80566 15.3623 7.4668C15.3623 9.12793 16.7334 10.499 18.3945 10.499ZM14 21.3799C13.0068 21.3799 12.2949 20.668 12.2334 19.5781H15.7754C15.7227 20.6592 15.002 21.3799 14 21.3799Z'
            : 'M6.96875 19.4639H21.0225C21.9277 19.4639 22.4814 18.9717 22.4814 18.2334C22.4814 17.3018 21.6377 16.502 20.8467 15.7461C20.2842 15.1836 20.1084 14.0498 20.0293 13.0654C20.0029 12.4941 19.959 11.9492 19.8887 11.4307C19.4229 11.624 18.9131 11.7383 18.377 11.7383C16.0391 11.7383 14.1143 9.81348 14.1143 7.4668C14.1143 6.38574 14.5273 5.39258 15.1953 4.64551C14.8525 4.46094 14.4395 4.34668 13.9912 4.34668C12.6992 4.34668 11.7412 5.24316 11.3721 6.40332C9.10449 7.2207 8.15527 9.48828 8.02344 12.7051C7.90918 13.874 7.75977 15.1396 7.14453 15.7461C6.35352 16.502 5.50977 17.3018 5.50977 18.2334C5.50977 18.9717 6.06348 19.4639 6.96875 19.4639ZM18.3857 10.499C20.0381 10.499 21.418 9.12793 21.418 7.4668C21.418 5.80566 20.0381 4.43457 18.3857 4.43457C16.7246 4.43457 15.3535 5.80566 15.3535 7.4668C15.3535 9.12793 16.7246 10.499 18.3857 10.499ZM14 23.085C15.5557 23.085 16.6895 21.9688 16.8037 20.6943H11.1875C11.3018 21.9688 12.4355 23.085 14 23.085Z'
        }
      />
    )}
  </Icon>
)
