import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"
import type WPFooterProps from "../../../../../types/Thing/WPFooter/index.ts"

import WebPageElement from "./index.tsx"

// WPFooter adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	WPFooterProps,
	"WPFooter",
	ExtractLevelProps<WPFooterProps, WebPageElementProps>
>

export default function WPFooter({
	schemaType = "WPFooter",
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
