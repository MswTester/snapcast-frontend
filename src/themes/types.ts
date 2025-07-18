export interface Theme {
    colors: Colors;
    typography: Typography;
    dimensions: Dimensions;
}

export interface Dimensions {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
}

export interface Colors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    error: string;
}

export interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

export interface Typography {
  displayLarge: TypographyStyle;
  displayMedium: TypographyStyle;
  displaySmall: TypographyStyle;
  
  headlineLarge: TypographyStyle;
  headlineMedium: TypographyStyle;
  headlineSmall: TypographyStyle;
  
  titleLarge: TypographyStyle;
  titleMedium: TypographyStyle;
  titleSmall: TypographyStyle;
  
  bodyLarge: TypographyStyle;
  bodyMedium: TypographyStyle;
  bodySmall: TypographyStyle;
}

