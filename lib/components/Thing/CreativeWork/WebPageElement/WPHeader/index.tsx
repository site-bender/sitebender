import type BaseProps from "../../../../../types/index.ts"
import type WPHeaderProps from "../../../../../types/Thing/CreativeWork/WebPageElement/WPHeader/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPHeaderProps & BaseProps

export default function WPHeader({
	_type = "WPHeader",
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
		>
			{children}
		</WebPageElement>
	)
}
