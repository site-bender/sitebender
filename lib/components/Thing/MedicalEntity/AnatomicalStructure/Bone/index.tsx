import type BaseProps from "../../../../../types/index.ts"
import type { Bone as BoneProps } from "../../../../../types/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BoneProps & BaseProps

export default function Bone({
	_type = "Bone",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
