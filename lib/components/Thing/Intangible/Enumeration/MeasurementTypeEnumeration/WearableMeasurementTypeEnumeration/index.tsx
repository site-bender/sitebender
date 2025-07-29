import type BaseProps from "../../../../../../types/index.ts"
import type WearableMeasurementTypeEnumerationProps from "../../../../../../types/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/WearableMeasurementTypeEnumeration/index.ts"

import MeasurementTypeEnumeration from "../index.tsx"

export type Props = WearableMeasurementTypeEnumerationProps & BaseProps

export default function WearableMeasurementTypeEnumeration({
	_type = "WearableMeasurementTypeEnumeration",
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
