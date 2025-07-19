import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { AudienceProps } from "../../index.ts"
import type { PeopleAudienceProps } from "../index.ts"

export interface ParentAudienceProps {
	/** Maximal age of the child. */
	childMaxAge?: Number
	/** Minimal age of the child. */
	childMinAge?: Number
}

type ParentAudience =
	& Thing
	& AudienceProps
	& IntangibleProps
	& PeopleAudienceProps
	& ParentAudienceProps

export default ParentAudience
