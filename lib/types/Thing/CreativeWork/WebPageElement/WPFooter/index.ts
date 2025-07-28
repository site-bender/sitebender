import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import WPFooterComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/WPFooter/index.tsx"

export interface WPFooterProps {
}

type WPFooter =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPFooterProps

export default WPFooter
