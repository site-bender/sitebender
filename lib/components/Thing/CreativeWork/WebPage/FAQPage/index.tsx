import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FAQPageProps from "../../../../../types/Thing/FAQPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "./index.tsx"

// FAQPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	FAQPageProps,
	"FAQPage",
	ExtractLevelProps<FAQPageProps, WebPageProps>
>

export default function FAQPage({
	schemaType = "FAQPage",
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
