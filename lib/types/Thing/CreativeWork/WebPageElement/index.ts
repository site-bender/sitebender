import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface WebPageElementProps {
	cssSelector?: CssSelectorType
	xpath?: XPathType
}

type WebPageElement = Thing & CreativeWorkProps & WebPageElementProps

export default WebPageElement
