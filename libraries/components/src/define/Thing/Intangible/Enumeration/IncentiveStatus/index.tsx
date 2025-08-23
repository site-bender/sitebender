import type BaseProps from "../../../../../types/index.ts"
import type { IncentiveStatus as IncentiveStatusProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = IncentiveStatusProps & BaseProps

export default function IncentiveStatus({
	_type = "IncentiveStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
