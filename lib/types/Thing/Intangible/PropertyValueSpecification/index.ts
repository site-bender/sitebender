import type { Boolean, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"

export interface PropertyValueSpecificationProps {
	"@type"?: "PropertyValueSpecification"
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
