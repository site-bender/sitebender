import type BaseProps from "../../../../../types/index.ts"
import type MassProps from "../../../../../types/Thing/Intangible/Quantity/Mass/index.ts"

import Quantity from "../index.tsx"

export type Props = MassProps & BaseProps

export default function Mass({
	_type = "Mass",
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
		>
			{children}
		</Quantity>
	)
}
