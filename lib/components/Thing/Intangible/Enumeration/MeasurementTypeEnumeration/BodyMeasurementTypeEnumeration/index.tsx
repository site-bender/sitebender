import type BaseProps from "../../../../../../types/index.ts"
import type { BodyMeasurementTypeEnumerationProps } from "../../../../../../types/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/BodyMeasurementTypeEnumeration/index.ts"

import MeasurementTypeEnumeration from "../index.tsx"

export type Props = BodyMeasurementTypeEnumerationProps & BaseProps

export default function BodyMeasurementTypeEnumeration({
	_type = "BodyMeasurementTypeEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MeasurementTypeEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
