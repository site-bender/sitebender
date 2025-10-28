import type { Integer, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalCondition from "../../../MedicalEntity/MedicalCondition/index.ts"
import type GenderType from "../../Enumeration/GenderType/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { AudienceProps } from "../index.ts"
import type { MedicalAudienceType } from "./MedicalAudience/index.ts"
import type { ParentAudienceType } from "./ParentAudience/index.ts"

import GenderTypeComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/GenderType/index.tsx"
import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import MedicalConditionComponent from "../../../../../../../architect/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"

export type PeopleAudienceType =
	| "PeopleAudience"
	| ParentAudienceType
	| MedicalAudienceType

export interface PeopleAudienceProps {
	"@type"?: PeopleAudienceType
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
