import type BaseProps from "../../../../../types/index.ts"
import type { BoardingPolicyTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/BoardingPolicyType/index.ts"

import Enumeration from "../index.tsx"

export type Props = BoardingPolicyTypeProps & BaseProps

export default function BoardingPolicyType({
	_type = "BoardingPolicyType",
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
