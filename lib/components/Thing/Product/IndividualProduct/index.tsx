import type BaseProps from "../../../../types/index.ts"
import type IndividualProductProps from "../../../../types/Thing/Product/IndividualProduct/index.ts"

import Product from "../index.tsx"

export type Props = IndividualProductProps & BaseProps

export default function IndividualProduct({
	serialNumber,
	_type = "IndividualProduct",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				serialNumber,
				...subtypeProperties,
			}}
		>{children}</Product>
	)
}
