import type BaseProps from "../../../../../types/index.ts"
import type { MedicalCause as MedicalCauseProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalCauseProps & BaseProps

export default function MedicalCause({
	_type = "MedicalCause",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
