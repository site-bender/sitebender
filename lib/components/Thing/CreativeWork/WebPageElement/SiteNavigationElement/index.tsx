import type BaseProps from "../../../../../types/index.ts"
import type SiteNavigationElementProps from "../../../../../types/Thing/CreativeWork/WebPageElement/SiteNavigationElement/index.ts"

import WebPageElement from "../index.tsx"

export type Props = SiteNavigationElementProps & BaseProps

export default function SiteNavigationElement({
	_type = "SiteNavigationElement",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPageElement
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</WebPageElement>
	)
}
