import type BaseProps from "../../../../../../types/index.ts"
import type { DiagnosticProcedure as DiagnosticProcedureProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DiagnosticProcedureProps & BaseProps

export default function DiagnosticProcedure({
	_type = "DiagnosticProcedure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
