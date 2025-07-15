import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ItemPageProps from "../../../../../types/Thing/ItemPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "./index.tsx"

// ItemPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	ItemPageProps,
	"ItemPage",
	ExtractLevelProps<ItemPageProps, WebPageProps>
>

export default function ItemPage({
	schemaType = "ItemPage",
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
