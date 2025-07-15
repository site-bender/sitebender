import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"
import type WPHeaderProps from "../../../../../types/Thing/WPHeader/index.ts"

import WebPageElement from "./index.tsx"

// WPHeader adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	WPHeaderProps,
	"WPHeader",
	ExtractLevelProps<WPHeaderProps, WebPageElementProps>
>

export default function WPHeader({
	schemaType = "WPHeader",
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
