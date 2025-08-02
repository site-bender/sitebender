import type BaseProps from "../../../../../types/index.ts"
import type ProductCollectionProps from "../../../../../types/Thing/CreativeWork/Collection/ProductCollection/index.ts"

import Collection from "../index.tsx"

export type Props = ProductCollectionProps & BaseProps

export default function ProductCollection({
	includesObject,
	_type = "ProductCollection",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Collection
			{...props}
			_type={_type}
			subtypeProperties={{
				includesObject,
				...subtypeProperties,
			}}
		>
			{children}
		</Collection>
	)
}