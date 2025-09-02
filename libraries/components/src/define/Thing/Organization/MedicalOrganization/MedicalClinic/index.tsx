import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalClinic as MedicalClinicProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalClinicProps & BaseProps

export default function MedicalClinic({
	_type = "MedicalClinic",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
