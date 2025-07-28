import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import WebSiteComponent from "../../../../../components/Thing/CreativeWork/WebSite/index.tsx"

export interface WebSiteProps {
	issn?: Text
}

type WebSite =
	& Thing
	& CreativeWorkProps
	& WebSiteProps

export default WebSite
