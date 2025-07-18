import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DriveWheelConfigurationValueProps from "../../../../../../types/Thing/DriveWheelConfigurationValue/index.ts"
import type QualitativeValueProps from "../../../../../../types/Thing/QualitativeValue/index.ts"

import QualitativeValue from "../index.tsx"

// DriveWheelConfigurationValue adds no properties to the QualitativeValue schema type
export type Props = BaseComponentProps<
	DriveWheelConfigurationValueProps,
	"DriveWheelConfigurationValue",
	ExtractLevelProps<DriveWheelConfigurationValueProps, QualitativeValueProps>
>

export default function DriveWheelConfigurationValue({
	schemaType = "DriveWheelConfigurationValue",
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
