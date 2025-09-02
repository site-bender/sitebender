import type BaseProps from "../../../../../types/index.ts"
import type { Sculpture as SculptureProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SculptureProps & BaseProps

export default function Sculpture({
	_type = "Sculpture",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
