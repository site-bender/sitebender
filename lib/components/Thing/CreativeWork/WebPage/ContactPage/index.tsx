import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ContactPageProps from "../../../../../types/Thing/ContactPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// ContactPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	ContactPageProps,
	"ContactPage",
	ExtractLevelProps<ContactPageProps, WebPageProps>
>

export default function ContactPage({
	schemaType = "ContactPage",
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
