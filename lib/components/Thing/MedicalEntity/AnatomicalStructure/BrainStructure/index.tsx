import type BaseProps from "../../../../../types/index.ts"
import type { BrainStructure as BrainStructureProps } from "../../../../../types/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BrainStructureProps & BaseProps

export default function BrainStructure({
	_type = "BrainStructure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
