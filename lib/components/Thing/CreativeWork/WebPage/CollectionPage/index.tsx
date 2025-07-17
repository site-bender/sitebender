import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CollectionPageProps from "../../../../../types/Thing/CollectionPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// CollectionPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	CollectionPageProps,
	"CollectionPage",
	ExtractLevelProps<CollectionPageProps, WebPageProps>
>

export default function CollectionPage({
	schemaType = "CollectionPage",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<WebPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
