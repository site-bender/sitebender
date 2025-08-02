import type BaseProps from "../../../../../types/index.ts"
import type ShoppingCenterProps from "../../../../../types/Thing/Organization/LocalBusiness/ShoppingCenter/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = ShoppingCenterProps & BaseProps

export default function ShoppingCenter({
	_type = "ShoppingCenter",
	children,
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
		>
			{children}
		</LocalBusiness>
	)
}
