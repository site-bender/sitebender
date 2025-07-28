import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import WPAdBlockComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/WPAdBlock/index.tsx"

export interface WPAdBlockProps {
}

type WPAdBlock =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPAdBlockProps

export default WPAdBlock
