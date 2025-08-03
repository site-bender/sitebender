import type BaseProps from "../../../../../types/index.ts"
import type { DiagnosticLab as DiagnosticLabProps } from "../../../../../types/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = DiagnosticLabProps & BaseProps

export default function DiagnosticLab({
	_type = "DiagnosticLab",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
