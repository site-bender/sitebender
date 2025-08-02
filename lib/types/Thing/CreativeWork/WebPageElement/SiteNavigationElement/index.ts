import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export type SiteNavigationElementType = "SiteNavigationElement"

export interface SiteNavigationElementProps {
	"@type"?: SiteNavigationElementType
}

type SiteNavigationElement =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& SiteNavigationElementProps

export default SiteNavigationElement
