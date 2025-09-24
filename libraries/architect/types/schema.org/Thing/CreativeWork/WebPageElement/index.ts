import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { SiteNavigationElementType } from "./SiteNavigationElement/index.ts"
import type { TableType } from "./Table/index.ts"
import type { WPAdBlockType } from "./WPAdBlock/index.ts"
import type { WPFooterType } from "./WPFooter/index.ts"
import type { WPHeaderType } from "./WPHeader/index.ts"
import type { WPSideBarType } from "./WPSideBar/index.ts"

export type WebPageElementType =
	| "WebPageElement"
	| SiteNavigationElementType
	| WPHeaderType
	| WPSideBarType
	| WPFooterType
	| WPAdBlockType
	| TableType

export interface WebPageElementProps {
	"@type"?: WebPageElementType
	cssSelector?: CssSelectorType
	xpath?: XPathType
}

type WebPageElement = Thing & CreativeWorkProps & WebPageElementProps

export default WebPageElement
