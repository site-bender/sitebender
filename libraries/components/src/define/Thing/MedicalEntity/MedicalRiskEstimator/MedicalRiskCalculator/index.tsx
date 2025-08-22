import type BaseProps from "../../../../../types/index.ts"
import type { MedicalRiskCalculator as MedicalRiskCalculatorProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalRiskCalculatorProps & BaseProps

export default function MedicalRiskCalculator({
	_type = "MedicalRiskCalculator",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
