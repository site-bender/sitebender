import type BaseProps from "../../../../../types/index.ts"
import type { WPHeader as WPHeaderProps } from "../../../../../types/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPHeaderProps & BaseProps

export default function WPHeader({
	_type = "WPHeader",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
