import type BaseProps from "../../../../types/index.ts"
import type ProductGroupProps from "../../../../types/Thing/Product/ProductGroup/index.ts"

import Product from "../index.tsx"

export type Props = ProductGroupProps & BaseProps

export default function ProductGroup({
	hasVariant,
	productGroupID,
	variesBy,
	_type = "ProductGroup",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				hasVariant,
				productGroupID,
				variesBy,
				...subtypeProperties,
			}}
		/>
	)
}
