import type BaseProps from "../../../../types/index.ts"
import type { Painting as PaintingProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PaintingProps & BaseProps

export default function Painting({
	_type = "Painting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
