import type BaseProps from "../../../../types/index.ts"
import type { HealthPlanFormulary as HealthPlanFormularyProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HealthPlanFormularyProps & BaseProps

export default function HealthPlanFormulary({
	_type = "HealthPlanFormulary",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
