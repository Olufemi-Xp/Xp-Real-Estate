/// <reference types="react" />

declare module 'next/image' {
  import type React from 'react';

  export interface ImageProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    fill?: boolean;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}

