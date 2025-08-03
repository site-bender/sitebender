import type BaseProps from "../../../../../types/index.ts"
import type { TreatmentIndication as TreatmentIndicationProps } from "../../../../../types/index.ts"

import MedicalIndication from "../index.tsx"

export type Props = TreatmentIndicationProps & BaseProps

export default function TreatmentIndication({
	_type = "TreatmentIndication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
