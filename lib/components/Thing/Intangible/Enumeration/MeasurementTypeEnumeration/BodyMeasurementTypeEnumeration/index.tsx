import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyMeasurementTypeEnumerationProps from "../../../../../../types/Thing/BodyMeasurementTypeEnumeration/index.ts"
import type MeasurementTypeEnumerationProps from "../../../../../../types/Thing/MeasurementTypeEnumeration/index.ts"

import MeasurementTypeEnumeration from "./index.tsx"

// BodyMeasurementTypeEnumeration adds no properties to the MeasurementTypeEnumeration schema type
export type Props = BaseComponentProps<
	BodyMeasurementTypeEnumerationProps,
	"BodyMeasurementTypeEnumeration",
	ExtractLevelProps<
		BodyMeasurementTypeEnumerationProps,
		MeasurementTypeEnumerationProps
	>
>

export default function BodyMeasurementTypeEnumeration({
	schemaType = "BodyMeasurementTypeEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MeasurementTypeEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
