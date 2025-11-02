import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalSignOrSymptom as MedicalSignOrSymptomProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalSignOrSymptomProps & BaseProps

export default function MedicalSignOrSymptom({
	_type = "MedicalSignOrSymptom",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
