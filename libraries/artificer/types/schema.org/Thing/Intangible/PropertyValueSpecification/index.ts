import type { Boolean, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import ThingComponent from "../../../../../../architect/src/define/Thing/index.tsx"

export type PropertyValueSpecificationType = "PropertyValueSpecification"

export interface PropertyValueSpecificationProps {
	"@type"?: PropertyValueSpecificationType
	defaultValue?: Text | Thing | ReturnType<typeof ThingComponent>
	maxValue?: Number
	minValue?: Number
	multipleValues?: Boolean
	readonlyValue?: Boolean
	stepValue?: Number
	valueMaxLength?: Number
	valueMinLength?: Number
	valueName?: Text
	valuePattern?: Text
	valueRequired?: Boolean
}

type PropertyValueSpecification =
	& Thing
	& IntangibleProps
	& PropertyValueSpecificationProps

export default PropertyValueSpecification
