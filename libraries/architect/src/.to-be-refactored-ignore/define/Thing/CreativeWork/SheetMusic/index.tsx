import type BaseProps from "../../../../../types/index.ts"
import type { SheetMusic as SheetMusicProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SheetMusicProps & BaseProps

export default function SheetMusic({
	_type = "SheetMusic",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
