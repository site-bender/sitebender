import type BaseProps from "../../../../../types/index.ts"
import type { FoodEvent as FoodEventProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = FoodEventProps & BaseProps

export default function FoodEvent({
	_type = "FoodEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
