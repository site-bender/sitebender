import type { Integer } from "../../../DataType/index.ts"
import type CreativeWork from "../index.ts"

export default interface Collection extends CreativeWork {
	/** The number of items in the [[Collection]]. */
	collectionSize?: Integer
}
