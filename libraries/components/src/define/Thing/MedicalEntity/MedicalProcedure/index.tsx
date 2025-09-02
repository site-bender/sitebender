import type BaseProps from "../../../../../types/index.ts"
import type { MedicalProcedure as MedicalProcedureProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalProcedureProps & BaseProps

export default function MedicalProcedure({
	_type = "MedicalProcedure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
