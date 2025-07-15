import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type WebSiteProps from "../../../../types/Thing/WebSite/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	WebSiteProps,
	"WebSite",
	ExtractLevelProps<WebSiteProps, CreativeWorkProps>
>

export default function WebSite(
	{
		issn,
		schemaType = "WebSite",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				issn,
				...subtypeProperties,
			}}
		/>
	)
}
