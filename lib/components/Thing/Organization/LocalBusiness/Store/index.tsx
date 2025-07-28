import type BaseProps from "../../../../../types/index.ts"
import type { StoreProps } from "../../../../../types/Thing/Organization/LocalBusiness/Store/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = StoreProps & BaseProps

export default function Store({
	_type = "Store",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
