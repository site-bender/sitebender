import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../types/Thing/Product/index.ts"
import type { ProductCollectionProps } from "../../../../types/Thing/Product/ProductCollection/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	ProductCollectionProps,
	"ProductCollection",
	ExtractLevelProps<ThingProps, ProductProps>
>

export default function ProductCollection({
	includesObject,
	schemaType = "ProductCollection",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				includesObject,
				...subtypeProperties,
			}}
		/>
	)
}
