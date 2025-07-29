import type BaseProps from "../../../../../types/index.ts"
import type OnlineStoreProps from "../../../../../types/Thing/Organization/OnlineBusiness/OnlineStore/index.ts"

import OnlineBusiness from "../index.tsx"

export type Props = OnlineStoreProps & BaseProps

export default function OnlineStore({
	_type = "OnlineStore",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OnlineBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
