import type BaseProps from "../../../../../types/index.ts"
import type { PaintAction as PaintActionProps } from "../../../../../types/index.ts"

import CreateAction from "../index.tsx"

export type Props = PaintActionProps & BaseProps

export default function PaintAction({
	_type = "PaintAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
