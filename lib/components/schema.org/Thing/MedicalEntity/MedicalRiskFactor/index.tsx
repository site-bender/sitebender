import type BaseProps from "../../../../types/index.ts"
import type { MedicalRiskFactor as MedicalRiskFactorProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalRiskFactorProps & BaseProps

export default function MedicalRiskFactor({
	_type = "MedicalRiskFactor",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
