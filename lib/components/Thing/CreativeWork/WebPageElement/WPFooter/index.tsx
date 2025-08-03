import type BaseProps from "../../../../../types/index.ts"
import type { WPFooter as WPFooterProps } from "../../../../../types/index.ts"

import WebPageElement from "../index.tsx"

export type Props = WPFooterProps & BaseProps

export default function WPFooter({
	_type = "WPFooter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
