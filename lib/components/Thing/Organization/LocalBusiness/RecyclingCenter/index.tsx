import type BaseProps from "../../../../../types/index.ts"
import type { RecyclingCenter as RecyclingCenterProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RecyclingCenterProps & BaseProps

export default function RecyclingCenter({
	_type = "RecyclingCenter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
