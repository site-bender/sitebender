import type BaseProps from "../../../../../../types/index.ts"
import type { PsychologicalTreatment as PsychologicalTreatmentProps } from "../../../../../../types/index.ts"

import TherapeuticProcedure from "../index.tsx"

export type Props = PsychologicalTreatmentProps & BaseProps

export default function PsychologicalTreatment({
	_type = "PsychologicalTreatment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
