import type BaseProps from "../../../../types/index.ts"
import type QuantityProps from "../../../../types/Thing/Intangible/Quantity/index.ts"

import Intangible from "../index.tsx"

export type Props = QuantityProps & BaseProps

export default function Quantity({
	_type = "Quantity",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
