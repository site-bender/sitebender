import type BaseProps from "../../../../../../types/index.ts"
import type { PublicSwimmingPool as PublicSwimmingPoolProps } from "../../../../../../types/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = PublicSwimmingPoolProps & BaseProps

export default function PublicSwimmingPool({
	_type = "PublicSwimmingPool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
