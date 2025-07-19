import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface GuideProps {
	/** This Review or Rating is relevant to this part or facet of the itemReviewed. */
	reviewAspect?: Text
}

type Guide =
	& Thing
	& CreativeWorkProps
	& GuideProps

export default Guide
