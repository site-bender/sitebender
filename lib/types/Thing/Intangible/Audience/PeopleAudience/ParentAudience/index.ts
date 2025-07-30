import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { AudienceProps } from "../../index.ts"
import type { PeopleAudienceProps } from "../index.ts"

export interface ParentAudienceProps {
	"@type"?: "ParentAudience"
	childMaxAge?: Number
	childMinAge?: Number
}

type ParentAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& PeopleAudienceProps
	& ParentAudienceProps

export default ParentAudience
