import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"
import type WPSideBarProps from "../../../../../types/Thing/WPSideBar/index.ts"

import WebPageElement from "../index.tsx"

// WPSideBar adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	WPSideBarProps,
	"WPSideBar",
	ExtractLevelProps<WPSideBarProps, WebPageElementProps>
>

export default function WPSideBar({
	schemaType = "WPSideBar",
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
