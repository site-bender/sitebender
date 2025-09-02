import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalSpecialty as MedicalSpecialtyProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalSpecialtyProps & BaseProps

export default function MedicalSpecialty({
	_type = "MedicalSpecialty",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
