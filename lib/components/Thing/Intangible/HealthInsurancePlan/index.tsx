import type BaseProps from "../../../../types/index.ts"
import type { HealthInsurancePlan as HealthInsurancePlanProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = HealthInsurancePlanProps & BaseProps

export default function HealthInsurancePlan({
	_type = "HealthInsurancePlan",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
