import type BaseProps from "../../../../../types/index.ts"
import type { CarUsageTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/CarUsageType/index.ts"

import Enumeration from "../index.tsx"

export type Props = CarUsageTypeProps & BaseProps

export default function CarUsageType({
	_type = "CarUsageType",
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
