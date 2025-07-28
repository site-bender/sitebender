import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { CollectionProps } from "../../../../types/Thing/CreativeWork/Collection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CollectionProps,
	"Collection",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Collection({
	collectionSize,
	schemaType = "Collection",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				collectionSize,
				...subtypeProperties,
			}}
		/>
	)
}
