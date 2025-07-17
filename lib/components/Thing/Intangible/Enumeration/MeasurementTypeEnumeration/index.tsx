import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MeasurementTypeEnumerationProps from "../../../../../types/Thing/MeasurementTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

// MeasurementTypeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MeasurementTypeEnumerationProps,
	"MeasurementTypeEnumeration",
	ExtractLevelProps<MeasurementTypeEnumerationProps, EnumerationProps>
>

export default function MeasurementTypeEnumeration({
	schemaType = "MeasurementTypeEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
