import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface WPFooterProps {
	"@type"?: "WPFooter"}

type WPFooter = Thing & CreativeWorkProps & WebPageElementProps & WPFooterProps

export default WPFooter
