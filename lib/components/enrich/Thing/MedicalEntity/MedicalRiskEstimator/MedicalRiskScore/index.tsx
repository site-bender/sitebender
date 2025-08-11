import type BaseProps from "../../../../../types/index.ts"
import type { MedicalRiskScore as MedicalRiskScoreProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalRiskScoreProps & BaseProps

export default function MedicalRiskScore({
	_type = "MedicalRiskScore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
