import type BaseProps from "../../../../types/index.ts"
import type { MedicalCause as MedicalCauseProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalCauseProps & BaseProps

export default function MedicalCause({
	_type = "MedicalCause",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
