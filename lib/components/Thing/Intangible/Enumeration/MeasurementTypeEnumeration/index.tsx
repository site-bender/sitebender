import type BaseProps from "../../../../../types/index.ts"
import type MeasurementTypeEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = MeasurementTypeEnumerationProps & BaseProps

export default function MeasurementTypeEnumeration({
	_type = "MeasurementTypeEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
