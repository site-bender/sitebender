import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalProcedureType as MedicalProcedureTypeProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalProcedureTypeProps & BaseProps

export default function MedicalProcedureType({
	_type = "MedicalProcedureType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
