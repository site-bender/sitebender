import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AboutPageProps from "../../../../../types/Thing/AboutPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// AboutPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	AboutPageProps,
	"AboutPage",
	ExtractLevelProps<AboutPageProps, WebPageProps>
>

export default function AboutPage({
	schemaType = "AboutPage",
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
