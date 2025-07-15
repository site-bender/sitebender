import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SiteNavigationElementProps from "../../../../../types/Thing/SiteNavigationElement/index.ts"
import type WebPageElementProps from "../../../../../types/Thing/WebPageElement/index.ts"

import WebPageElement from "./index.tsx"

// SiteNavigationElement adds no properties to the WebPageElement schema type
export type Props = BaseComponentProps<
	SiteNavigationElementProps,
	"SiteNavigationElement",
	ExtractLevelProps<SiteNavigationElementProps, WebPageElementProps>
>

export default function SiteNavigationElement({
	schemaType = "SiteNavigationElement",
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
