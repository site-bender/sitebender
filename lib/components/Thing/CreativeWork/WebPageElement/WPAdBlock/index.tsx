import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"
import type WPAdBlockProps from "../../../../../types/Thing/WPAdBlock/index.ts"

import WebPageElement from "./index.tsx"

// WPAdBlock adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	WPAdBlockProps,
	"WPAdBlock",
	ExtractLevelProps<WPAdBlockProps, WebPageElementProps>
>

export default function WPAdBlock({
	schemaType = "WPAdBlock",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<WebPageElement
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
