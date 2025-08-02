import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export type WPFooterType = "WPFooter"

export interface WPFooterProps {
	"@type"?: WPFooterType
}

type WPFooter = Thing & CreativeWorkProps & WebPageElementProps & WPFooterProps

export default WPFooter
