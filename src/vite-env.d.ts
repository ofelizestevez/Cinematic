/// <reference types="vite/client" />
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    names: {
      headerHeight: string
      buttonPaddingHeight: string
      buttonPaddingWidth: string
      buttonBottom: string
      buttonGap: string
      contentHeaderPaddingHeight: string
      contentFgColor: string
      contentBgColor: string
      contentHeaderBgColor: string
      contentHeaderShadow: string
    }
    sizes: {
        headerHeight: string;
        buttonPaddingHeight: string;
        buttonPaddingWidth: string;
        buttonBottom: string;
        buttonGap: string;
        contentHeaderPaddingHeight: string;
    }
    colors: {
        dark: ThemeColors
        light: ThemeColors
    }
  }

  export interface ThemeColors {
    contentFgColor: string;
    contentBgColor: string;
    contentHeaderBgColor: string;
    contentHeaderShadow: string;
}
}