import type BaseProps from "../../../../types/index.ts"
import type { MedicalRiskEstimator as MedicalRiskEstimatorProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalRiskEstimatorProps & BaseProps

export default function MedicalRiskEstimator({
	_type = "MedicalRiskEstimator",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
