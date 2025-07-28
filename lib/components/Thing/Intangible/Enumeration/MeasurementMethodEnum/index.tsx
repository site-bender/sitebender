import type BaseProps from "../../../../../types/index.ts"
import type { MeasurementMethodEnumProps } from "../../../../../types/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"

import Enumeration from "../index.tsx"

export type Props = MeasurementMethodEnumProps & BaseProps

export default function MeasurementMethodEnum({
	_type = "MeasurementMethodEnum",
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
