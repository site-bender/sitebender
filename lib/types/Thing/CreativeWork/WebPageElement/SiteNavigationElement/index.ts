import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import SiteNavigationElementComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/SiteNavigationElement/index.tsx"

export interface SiteNavigationElementProps {
}

type SiteNavigationElement =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& SiteNavigationElementProps

export default SiteNavigationElement
