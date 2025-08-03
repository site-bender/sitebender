import type BaseProps from "../../../../../types/index.ts"
import type { WPSideBar as WPSideBarProps } from "../../../../../types/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPSideBarProps & BaseProps

export default function WPSideBar({
	_type = "WPSideBar",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
