import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MeasurementMethodEnumProps from "../../../../../types/Thing/MeasurementMethodEnum/index.ts"

import Enumeration from "../index.tsx"

// MeasurementMethodEnum adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MeasurementMethodEnumProps,
	"MeasurementMethodEnum",
	ExtractLevelProps<MeasurementMethodEnumProps, EnumerationProps>
>

export default function MeasurementMethodEnum({
	schemaType = "MeasurementMethodEnum",
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
