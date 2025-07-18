import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MeasurementTypeEnumerationProps from "../../../../../../types/Thing/MeasurementTypeEnumeration/index.ts"
import type WearableMeasurementTypeEnumerationProps from "../../../../../../types/Thing/WearableMeasurementTypeEnumeration/index.ts"

import MeasurementTypeEnumeration from "../index.tsx"

// WearableMeasurementTypeEnumeration adds no properties to the MeasurementTypeEnumeration schema type
export type Props = BaseComponentProps<
	WearableMeasurementTypeEnumerationProps,
	"WearableMeasurementTypeEnumeration",
	ExtractLevelProps<
		WearableMeasurementTypeEnumerationProps,
		MeasurementTypeEnumerationProps
	>
>

export default function WearableMeasurementTypeEnumeration({
	schemaType = "WearableMeasurementTypeEnumeration",
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
