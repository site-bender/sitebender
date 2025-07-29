import type BaseProps from "../../../../types/index.ts"
import type CollectionProps from "../../../../types/Thing/CreativeWork/Collection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CollectionProps & BaseProps

export default function Collection({
	collectionSize,
	_type = "Collection",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				collectionSize,
				...subtypeProperties,
			}}
		/>
	)
}
