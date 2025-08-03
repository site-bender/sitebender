import type BaseProps from "../../../../../types/index.ts"
import type { TherapeuticProcedure as TherapeuticProcedureProps } from "../../../../../types/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = TherapeuticProcedureProps & BaseProps

export default function TherapeuticProcedure({
	_type = "TherapeuticProcedure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
