import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type QualitativeValueProps from "../../../../../../types/Thing/QualitativeValue/index.ts"
import type SteeringPositionValueProps from "../../../../../../types/Thing/SteeringPositionValue/index.ts"

import QualitativeValue from "../index.tsx"

// SteeringPositionValue adds no properties to the QualitativeValue schema type
export type Props = BaseComponentProps<
	SteeringPositionValueProps,
	"SteeringPositionValue",
	ExtractLevelProps<SteeringPositionValueProps, QualitativeValueProps>
>

export default function SteeringPositionValue({
	schemaType = "SteeringPositionValue",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<QualitativeValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
