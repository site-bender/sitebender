import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import CollectionPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/CollectionPage/index.tsx"

export interface CollectionPageProps {
}

type CollectionPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps

export default CollectionPage
