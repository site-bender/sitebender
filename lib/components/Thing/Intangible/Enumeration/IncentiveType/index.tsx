import type BaseProps from "../../../../../types/index.ts"
import type { IncentiveType as IncentiveTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = IncentiveTypeProps & BaseProps

export default function IncentiveType({
	_type = "IncentiveType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
