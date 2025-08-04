import type BaseProps from "../../../../../types/index.ts"
import type { SurgicalProcedure as SurgicalProcedureProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SurgicalProcedureProps & BaseProps

export default function SurgicalProcedure({
	_type = "SurgicalProcedure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
