import type BaseProps from "../../../../../types/index.ts"
import type WPFooterProps from "../../../../../types/Thing/CreativeWork/WebPageElement/WPFooter/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPFooterProps & BaseProps

export default function WPFooter({
	_type = "WPFooter",
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
