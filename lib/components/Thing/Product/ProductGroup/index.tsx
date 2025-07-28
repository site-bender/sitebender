import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../types/Thing/Product/index.ts"
import type { ProductGroupProps } from "../../../../types/Thing/Product/ProductGroup/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	ProductGroupProps,
	"ProductGroup",
	ExtractLevelProps<ThingProps, ProductProps>
>

export default function ProductGroup({
	hasVariant,
	productGroupID,
	variesBy,
	schemaType = "ProductGroup",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasVariant,
				productGroupID,
				variesBy,
				...subtypeProperties,
			}}
		/>
	)
}
