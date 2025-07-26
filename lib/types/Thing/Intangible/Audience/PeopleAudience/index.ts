import type { Integer, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"
import type GenderType from "../../Enumeration/GenderType/index.ts"
import type MedicalCondition from "../../../MedicalEntity/MedicalCondition/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

export interface PeopleAudienceProps {
	healthCondition?: MedicalCondition
	requiredGender?: Text
	requiredMaxAge?: Integer
	requiredMinAge?: Integer
	suggestedAge?: QuantitativeValue
	suggestedGender?: GenderType | Text
	suggestedMaxAge?: Number
	suggestedMeasurement?: QuantitativeValue
	suggestedMinAge?: Number
}

type PeopleAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& PeopleAudienceProps

export default PeopleAudience
