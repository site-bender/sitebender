import type BaseProps from "../../../../../../types/index.ts"
import type DriveWheelConfigurationValueProps from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/DriveWheelConfigurationValue/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = DriveWheelConfigurationValueProps & BaseProps

export default function DriveWheelConfigurationValue({
	_type = "DriveWheelConfigurationValue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<QualitativeValue
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
