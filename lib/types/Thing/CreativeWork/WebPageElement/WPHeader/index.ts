import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import WPHeaderComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/WPHeader/index.tsx"

export interface WPHeaderProps {
}

type WPHeader =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPHeaderProps

export default WPHeader
