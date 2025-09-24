import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalSymptom as MedicalSymptomProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalSymptomProps & BaseProps

export default function MedicalSymptom({
	_type = "MedicalSymptom",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
