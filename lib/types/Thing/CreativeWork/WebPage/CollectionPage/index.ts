import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface CollectionPageProps {
	"@type"?: "CollectionPage"}

type CollectionPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps

export default CollectionPage
