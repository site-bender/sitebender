import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalSign as MedicalSignProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalSignProps & BaseProps

export default function MedicalSign({
	_type = "MedicalSign",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
