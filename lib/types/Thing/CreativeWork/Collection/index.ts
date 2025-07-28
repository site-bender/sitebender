import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CollectionComponent from "../../../../../components/Thing/CreativeWork/Collection/index.tsx"

export interface CollectionProps {
	collectionSize?: Integer
}

type Collection =
	& Thing
	& CreativeWorkProps
	& CollectionProps

export default Collection
