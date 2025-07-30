import type BaseProps from "../../../../../types/index.ts"
import type EnergyProps from "../../../../../types/Thing/Intangible/Quantity/Energy/index.ts"

import Quantity from "../index.tsx"

export type Props = EnergyProps & BaseProps

export default function Energy({
	_type = "Energy",
	children,
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
		>{children}</Quantity>
	)
}
