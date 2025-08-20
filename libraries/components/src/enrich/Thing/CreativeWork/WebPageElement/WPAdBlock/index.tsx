import type BaseProps from "../../../../../types/index.ts"
import type { WPAdBlock as WPAdBlockProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WPAdBlockProps & BaseProps

export default function WPAdBlock({
	_type = "WPAdBlock",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
