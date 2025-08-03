import type BaseProps from "../../../../../types/index.ts"
import type { ServicePeriod as ServicePeriodProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ServicePeriodProps & BaseProps

export default function ServicePeriod({
	_type = "ServicePeriod",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
