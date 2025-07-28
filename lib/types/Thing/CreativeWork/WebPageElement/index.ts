import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import WebPageElementComponent from "../../../../../components/Thing/CreativeWork/WebPageElement/index.tsx"

export interface WebPageElementProps {
	cssSelector?: CssSelectorType
	xpath?: XPathType
}

type WebPageElement =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps

export default WebPageElement
