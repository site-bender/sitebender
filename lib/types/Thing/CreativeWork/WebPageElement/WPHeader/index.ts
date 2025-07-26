import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface WPHeaderProps {
}

type WPHeader =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPHeaderProps

export default WPHeader
