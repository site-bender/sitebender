import type BaseProps from "../../../../../types/index.ts"
import type { ServicePeriodProps } from "../../../../../types/Thing/Intangible/StructuredValue/ServicePeriod/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ServicePeriodProps & BaseProps

export default function ServicePeriod({
	businessDays,
	cutoffTime,
	duration,
	_type = "ServicePeriod",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				businessDays,
				cutoffTime,
				duration,
				...subtypeProperties,
			}}
		/>
	)
}
