import type BaseProps from "../../../../../types/index.ts"
import type MonetaryGrantProps from "../../../../../types/Thing/Intangible/Grant/MonetaryGrant/index.ts"

import Grant from "../index.tsx"

export type Props = MonetaryGrantProps & BaseProps

export default function MonetaryGrant({
	amount,
	funder,
	_type = "MonetaryGrant",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Grant
			{...props}
			_type={_type}
			subtypeProperties={{
				amount,
				funder,
				...subtypeProperties,
			}}
		/>
	)
}
