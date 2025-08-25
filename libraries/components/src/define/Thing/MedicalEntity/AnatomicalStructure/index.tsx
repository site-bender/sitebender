import type BaseProps from "../../../../../types/index.ts"
import type { AnatomicalStructure as AnatomicalStructureProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AnatomicalStructureProps & BaseProps

export default function AnatomicalStructure({
	_type = "AnatomicalStructure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
