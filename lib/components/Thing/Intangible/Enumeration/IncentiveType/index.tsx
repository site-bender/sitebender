import type BaseProps from "../../../../../types/index.ts"
import type { IncentiveTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/IncentiveType/index.ts"

import Enumeration from "../index.tsx"

export type Props = IncentiveTypeProps & BaseProps

export default function IncentiveType({
	_type = "IncentiveType",
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
