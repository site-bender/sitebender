import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface CollectionProps {
	collectionSize?: Integer
}

type Collection =
	& Thing
	& CreativeWorkProps
	& CollectionProps

export default Collection
