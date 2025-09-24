import type BaseProps from "../../../../../types/index.ts"
import type { AlignmentObject as AlignmentObjectProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AlignmentObjectProps & BaseProps

export default function AlignmentObject({
	_type = "AlignmentObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
