import type BaseProps from "../../../../../types/index.ts"
import type { HealthPlanCostSharingSpecification as HealthPlanCostSharingSpecificationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HealthPlanCostSharingSpecificationProps & BaseProps

export default function HealthPlanCostSharingSpecification({
	_type = "HealthPlanCostSharingSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
