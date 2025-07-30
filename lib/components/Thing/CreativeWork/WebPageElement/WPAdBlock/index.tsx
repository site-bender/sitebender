import type BaseProps from "../../../../../types/index.ts"
import type WPAdBlockProps from "../../../../../types/Thing/CreativeWork/WebPageElement/WPAdBlock/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPAdBlockProps & BaseProps

export default function WPAdBlock({
	_type = "WPAdBlock",
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
