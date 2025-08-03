import type BaseProps from "../../../../types/index.ts"
import type { Drawing as DrawingProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DrawingProps & BaseProps

export default function Drawing({
	_type = "Drawing",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
