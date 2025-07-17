import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type QAPageProps from "../../../../../types/Thing/QAPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// QAPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	QAPageProps,
	"QAPage",
	ExtractLevelProps<QAPageProps, WebPageProps>
>

export default function QAPage({
	schemaType = "QAPage",
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
