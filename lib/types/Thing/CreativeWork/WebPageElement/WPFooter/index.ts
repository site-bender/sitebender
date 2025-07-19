// WPFooter extends WebPageElement but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface WPFooterProps {}

type WPFooter =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPFooterProps

export default WPFooter
