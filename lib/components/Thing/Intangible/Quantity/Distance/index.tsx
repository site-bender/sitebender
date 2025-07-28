import type BaseProps from "../../../../../types/index.ts"
import type { DistanceProps } from "../../../../../types/Thing/Intangible/Quantity/Distance/index.ts"

import Quantity from "../index.tsx"

export type Props = DistanceProps & BaseProps

export default function Distance({
	_type = "Distance",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Quantity
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
