import type BaseProps from "../../../../types/index.ts"
import type { CivicStructure as CivicStructureProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CivicStructureProps & BaseProps

export default function CivicStructure({
	_type = "CivicStructure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
