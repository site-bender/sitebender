import type BaseProps from "../../../../types/index.ts"
import type WebSiteProps from "../../../../types/Thing/CreativeWork/WebSite/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebSiteProps & BaseProps

export default function WebSite({
	issn,
	_type = "WebSite",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				issn,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
