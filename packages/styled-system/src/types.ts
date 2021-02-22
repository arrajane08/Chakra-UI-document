import { Dict } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { BreakpointReturn } from "./breakpoints"
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  ListProps,
  OtherProps,
  OutlineProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TransformProps,
  TransitionProps,
  TypographyProps,
} from "./config"
import { Pseudos } from "./pseudos"
import { ResponsiveValue } from "./utils"

export interface StyleProps
  extends SpaceProps,
    ColorProps,
    TransitionProps,
    TypographyProps,
    FlexboxProps,
    TransformProps,
    GridProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    BackgroundProps,
    ListProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemCSSProperties
  extends CSS.Properties,
    Omit<StyleProps, keyof CSS.Properties> {}

export type ThemeThunk<T> = T | ((theme: Dict) => T)

type PropertyValue<K extends keyof SystemCSSProperties> = ThemeThunk<
  ResponsiveValue<boolean | number | string | SystemCSSProperties[K]>
>

export type CSSWithMultiValues = {
  [K in keyof SystemCSSProperties]?: K extends keyof StyleProps
    ? StyleProps[K] | PropertyValue<K>
    : PropertyValue<K>
}

type PseudoKeys = keyof CSS.Pseudos | keyof Pseudos

type PseudoSelectorDefinition<D> = D | RecursivePseudo<D>

export type RecursivePseudo<D> = {
  [K in PseudoKeys]?: PseudoSelectorDefinition<D> & D
}

type CSSDefinition<D> = D | string | RecursiveCSSSelector<D | string>

export interface RecursiveCSSSelector<D> {
  [selector: string]: CSSDefinition<D> & D
}

export type RecursiveCSSObject<D> = D &
  (D | RecursivePseudo<D> | RecursiveCSSSelector<D>)

export type CSSObject = RecursiveCSSObject<CSSWithMultiValues>

export type SystemStyleObject = CSSObject

export interface FunctionCSSInterpolation {
  (theme: Dict): CSSObject
}

export type StyleObjectOrFn = CSSObject | FunctionCSSInterpolation

type PseudoProps = {
  [K in keyof Pseudos]?: SystemStyleObject
}

export interface SystemProps extends StyleProps, PseudoProps {}

export type ThemeDirection = "ltr" | "rtl"

export type CSSMap = Dict<{ value: string; var: string; varRef: string }>

export type Transform = (value: any, theme: Theme) => any

export type WithCSSVar<T> = T & {
  __cssVars: Dict
  __cssMap: CSSMap
}

export type Theme = WithCSSVar<{
  breakpoints: Dict
  direction?: ThemeDirection
  [key: string]: any
}>

export interface CachedValue {
  theme: Theme
  breakpoint: BreakpointReturn
  [key: string]: any
}
