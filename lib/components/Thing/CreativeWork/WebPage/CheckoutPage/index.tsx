import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CheckoutPageProps from "../../../../../types/Thing/CheckoutPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// CheckoutPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	CheckoutPageProps,
	"CheckoutPage",
	ExtractLevelProps<CheckoutPageProps, WebPageProps>
>

export default function CheckoutPage({
	schemaType = "CheckoutPage",
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
