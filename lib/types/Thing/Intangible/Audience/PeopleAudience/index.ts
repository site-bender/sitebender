import type { Integer, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalCondition from "../../../MedicalEntity/MedicalCondition/index.ts"
import type GenderType from "../../Enumeration/GenderType/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { AudienceProps } from "../index.ts"

import GenderTypeComponent from "../../../../../components/Thing/Intangible/Enumeration/GenderType/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import MedicalConditionComponent from "../../../../../components/Thing/MedicalEntity/MedicalCondition/index.ts"

export interface PeopleAudienceProps {
	healthCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	requiredGender?: Text
	requiredMaxAge?: Integer
	requiredMinAge?: Integer
	suggestedAge?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	suggestedGender?: GenderType | Text | ReturnType<typeof GenderTypeComponent>
	suggestedMaxAge?: Number
	suggestedMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	suggestedMinAge?: Number
}

type PeopleAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& PeopleAudienceProps

export default PeopleAudience
