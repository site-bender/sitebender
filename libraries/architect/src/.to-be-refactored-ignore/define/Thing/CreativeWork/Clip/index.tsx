import type BaseProps from "../../../../../types/index.ts"
import type { Clip as ClipProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ClipProps & BaseProps

export default function Clip({
	_type = "Clip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
