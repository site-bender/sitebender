import type BaseProps from "../../../../../types/index.ts"
import type WPSideBarProps from "../../../../../types/Thing/CreativeWork/WebPageElement/WPSideBar/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPSideBarProps & BaseProps

export default function WPSideBar({
	_type = "WPSideBar",
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
		/>
	)
}
