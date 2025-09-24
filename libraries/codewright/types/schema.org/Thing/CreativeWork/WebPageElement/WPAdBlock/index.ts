import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export type WPAdBlockType = "WPAdBlock"

export interface WPAdBlockProps {
	"@type"?: WPAdBlockType
}

type WPAdBlock =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPAdBlockProps

export default WPAdBlock
