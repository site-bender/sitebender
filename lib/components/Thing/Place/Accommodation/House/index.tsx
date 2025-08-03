import type BaseProps from "../../../../../types/index.ts"
import type { House as HouseProps } from "../../../../../types/index.ts"

import Accommodation from "../index.tsx"

export type Props = HouseProps & BaseProps

export default function House({
	_type = "House",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
