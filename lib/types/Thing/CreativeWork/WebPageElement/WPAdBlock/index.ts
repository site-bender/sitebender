import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface WPAdBlockProps {
	"@type"?: "WPAdBlock"}

type WPAdBlock =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPAdBlockProps

export default WPAdBlock
