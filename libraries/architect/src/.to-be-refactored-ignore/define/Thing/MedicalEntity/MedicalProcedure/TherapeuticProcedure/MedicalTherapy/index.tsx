import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalTherapy as MedicalTherapyProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalTherapyProps & BaseProps

export default function MedicalTherapy({
	_type = "MedicalTherapy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
