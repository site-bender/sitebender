import type { Text } from "../../../DataType/index.ts"
import type CreativeWork from "../index.ts"

export default interface Guide extends CreativeWork {
	/** This Review or Rating is relevant to this part or facet of the itemReviewed. */
	reviewAspect?: Text
}
