import type BaseProps from "../../../../../../types/index.ts"
import type { HousePainter as HousePainterProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HousePainterProps & BaseProps

export default function HousePainter({
	_type = "HousePainter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
