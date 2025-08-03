import type BaseProps from "../../../../types/index.ts"
import type { MedicalGuideline as MedicalGuidelineProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalGuidelineProps & BaseProps

export default function MedicalGuideline({
	_type = "MedicalGuideline",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
