import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface SiteNavigationElementProps {
	"@type"?: "SiteNavigationElement"}

type SiteNavigationElement =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& SiteNavigationElementProps

export default SiteNavigationElement
