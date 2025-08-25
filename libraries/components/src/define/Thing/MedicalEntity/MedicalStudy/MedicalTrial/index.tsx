import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalTrial as MedicalTrialProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalTrialProps & BaseProps

export default function MedicalTrial({
	_type = "MedicalTrial",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
