import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CollectionProps from "../../../../types/Thing/Collection/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CollectionProps,
	"Collection",
	ExtractLevelProps<CollectionProps, CreativeWorkProps>
>

export default function Collection(
	{
		collectionSize,
		schemaType = "Collection",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
