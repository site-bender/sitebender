import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { ProductCollectionType } from "./ProductCollection/index.ts"

export type CollectionType = "Collection" | ProductCollectionType

export interface CollectionProps {
	"@type"?: CollectionType
	collectionSize?: Integer
}

type Collection = Thing & CreativeWorkProps & CollectionProps

export default Collection
