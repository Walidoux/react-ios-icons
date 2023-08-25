import React from 'react'

import { Icon } from '../Icon'
import type { FilledProp, IconProps } from '../IconProps'

export const LightBulb: IconProps<FilledProp> = ({ filled = false, ...rest }) => (
  <Icon {...rest}>
    <path
      fill='currentColor'
      d={
        !filled
          ? 'M11.8911 9.47314H13.1823V6.79093C13.1823 6.4494 13.3691 6.26615 13.7259 6.26615H16.2911C16.6478 6.26615 16.8347 6.4494 16.8347 6.79093V9.47314H18.1259V6.68264C18.1259 5.63307 17.4803 5 16.41 5H13.6069C12.5366 5 11.8911 5.63307 11.8911 6.68264V9.47314ZM14.9915 20.4103C18.4402 20.4103 21.3112 17.5948 21.3112 14.2129C21.3112 10.8309 18.4486 8.01542 15 8.01542C11.5428 8.01542 8.67181 10.8309 8.67181 14.2129C8.67181 17.5948 11.5428 20.4103 14.9915 20.4103ZM15.0085 19.0692C12.3073 19.0692 10.0564 16.8617 10.0564 14.2129C10.0564 11.5723 12.3073 9.35653 15 9.35653C17.7011 9.35653 19.9606 11.5639 19.9606 14.2129C19.9606 16.8617 17.7097 19.0692 15.0085 19.0692ZM21.4811 8.87339L22.7721 7.59893C23.0525 7.32404 23.0525 6.85757 22.7721 6.58268C22.4919 6.30779 22.0247 6.30779 21.7444 6.58268L20.4363 7.85715C20.156 8.12371 20.156 8.59851 20.4363 8.87339C20.7166 9.14828 21.2008 9.14828 21.4811 8.87339ZM23.4347 14.9292H25.261C25.6602 14.9292 26 14.6043 26 14.2129C26 13.8214 25.6602 13.4881 25.261 13.4881H23.4347C23.0355 13.4881 22.6958 13.8214 22.6958 14.2129C22.6958 14.6043 23.0355 14.9292 23.4347 14.9292ZM20.4363 20.5686L21.7444 21.8347C22.0247 22.1095 22.4919 22.1095 22.7721 21.8347C23.0525 21.5598 23.0525 21.0934 22.7721 20.8268L21.4811 19.544C21.2008 19.269 20.7166 19.269 20.4363 19.544C20.156 19.8189 20.156 20.2937 20.4363 20.5686ZM15.7475 22.4844C15.7475 22.0929 15.4077 21.7681 15.0085 21.7681C14.6092 21.7681 14.278 22.0929 14.278 22.4844V24.2836C14.278 24.6752 14.6092 25 15.0085 25C15.4077 25 15.7475 24.6752 15.7475 24.2836V22.4844ZM9.5552 20.5686C9.83551 20.2937 9.83551 19.8189 9.5552 19.544C9.27489 19.269 8.79922 19.269 8.51892 19.544L7.2193 20.8268C6.93899 21.0934 6.93899 21.5598 7.2193 21.8347C7.49961 22.1095 7.97529 22.1095 8.25559 21.8347L9.5552 20.5686ZM6.56525 14.9292C6.96447 14.9292 7.30424 14.6043 7.30424 14.2129C7.30424 13.8214 6.96447 13.4881 6.56525 13.4881H4.7305C4.33127 13.4881 4 13.8214 4 14.2129C4 14.6043 4.33127 14.9292 4.7305 14.9292H6.56525ZM8.51892 8.87339C8.79922 9.14828 9.27489 9.14828 9.5552 8.87339C9.83551 8.59851 9.83551 8.12371 9.5552 7.85715L8.25559 6.58268C7.97529 6.30779 7.49961 6.30779 7.2193 6.58268C6.93899 6.85757 6.93899 7.32404 7.2193 7.59893L8.51892 8.87339Z'
          : 'M14.9915 20.4103C18.4402 20.4103 21.3112 17.5948 21.3112 14.2129C21.3112 11.9388 20.0201 9.93129 18.1259 8.84841V6.68264C18.1259 5.63307 17.4803 5 16.41 5H13.6069C12.5366 5 11.8911 5.63307 11.8911 6.68264V8.83175C9.97991 9.9063 8.67181 11.9304 8.67181 14.2129C8.67181 17.5948 11.5428 20.4103 14.9915 20.4103ZM21.4811 8.87339L22.7721 7.59893C23.0525 7.32404 23.0525 6.85757 22.7721 6.58268C22.4919 6.30779 22.0247 6.30779 21.7444 6.58268L20.4363 7.85715C20.156 8.12371 20.156 8.59851 20.4363 8.87339C20.7166 9.14828 21.2008 9.14828 21.4811 8.87339ZM23.4347 14.9292H25.261C25.6602 14.9292 26 14.6043 26 14.2129C26 13.8214 25.6602 13.4881 25.261 13.4881H23.4347C23.0355 13.4881 22.6958 13.8214 22.6958 14.2129C22.6958 14.6043 23.0355 14.9292 23.4347 14.9292ZM20.4363 20.5686L21.7444 21.8347C22.0247 22.1095 22.4919 22.1095 22.7721 21.8347C23.0525 21.5598 23.0525 21.0934 22.7721 20.8268L21.4811 19.544C21.2008 19.269 20.7166 19.269 20.4363 19.544C20.156 19.8189 20.156 20.2937 20.4363 20.5686ZM15.7475 22.4844C15.7475 22.0929 15.4077 21.7681 15.0085 21.7681C14.6092 21.7681 14.278 22.0929 14.278 22.4844V24.2836C14.278 24.6752 14.6092 25 15.0085 25C15.4077 25 15.7475 24.6752 15.7475 24.2836V22.4844ZM9.5552 20.5686C9.83551 20.2937 9.83551 19.8189 9.5552 19.544C9.27489 19.269 8.79922 19.269 8.51892 19.544L7.2193 20.8268C6.93899 21.0934 6.93899 21.5598 7.2193 21.8347C7.49961 22.1095 7.97529 22.1095 8.25559 21.8347L9.5552 20.5686ZM6.56525 14.9292C6.96447 14.9292 7.30424 14.6043 7.30424 14.2129C7.30424 13.8214 6.96447 13.4881 6.56525 13.4881H4.7305C4.33127 13.4881 4 13.8214 4 14.2129C4 14.6043 4.33127 14.9292 4.7305 14.9292H6.56525ZM8.51892 8.87339C8.79922 9.14828 9.27489 9.14828 9.5552 8.87339C9.83551 8.59851 9.83551 8.12371 9.5552 7.85715L8.25559 6.58268C7.97529 6.30779 7.49961 6.30779 7.2193 6.58268C6.93899 6.85757 6.93899 7.32404 7.2193 7.59893L8.51892 8.87339Z'
      }
    />
  </Icon>
)