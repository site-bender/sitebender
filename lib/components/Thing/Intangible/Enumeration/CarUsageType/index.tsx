import type BaseProps from "../../../../../types/index.ts"
import type { CarUsageType as CarUsageTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = CarUsageTypeProps & BaseProps

export default function CarUsageType({
	_type = "CarUsageType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
