import type BaseProps from "../../../../../types/index.ts"
import type { Distance as DistanceProps } from "../../../../../types/index.ts"

import Quantity from "../index.tsx"

export type Props = DistanceProps & BaseProps

export default function Distance({
	_type = "Distance",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
