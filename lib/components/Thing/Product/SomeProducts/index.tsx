import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../types/Thing/Product/index.ts"
import type { SomeProductsProps } from "../../../../types/Thing/Product/SomeProducts/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	SomeProductsProps,
	"SomeProducts",
	ExtractLevelProps<ThingProps, ProductProps>
>

export default function SomeProducts({
	inventoryLevel,
	schemaType = "SomeProducts",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inventoryLevel,
				...subtypeProperties,
			}}
		/>
	)
}
