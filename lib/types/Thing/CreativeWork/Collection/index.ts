import { Integer } from "../../../DataType/index.ts"
import CreativeWork from "../index.ts"

export default interface Collection extends CreativeWork {
	/** The number of items in the [[Collection]]. */
	collectionSize?: Integer
}
