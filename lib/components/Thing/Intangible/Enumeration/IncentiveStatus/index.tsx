import type BaseProps from "../../../../../types/index.ts"
import type { IncentiveStatusProps } from "../../../../../types/Thing/Intangible/Enumeration/IncentiveStatus/index.ts"

import Enumeration from "../index.tsx"

export type Props = IncentiveStatusProps & BaseProps

export default function IncentiveStatus({
	_type = "IncentiveStatus",
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
