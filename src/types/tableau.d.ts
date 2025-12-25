import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        src?: string;
        width?: string;
        height?: string;
        toolbar?: string;
        'hide-tabs'?: boolean;
      };
    }
  }
}

export {};
