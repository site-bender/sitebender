import type BaseProps from "../../../../../../types/index.ts"
import type { FastFoodRestaurant as FastFoodRestaurantProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = FastFoodRestaurantProps & BaseProps

export default function FastFoodRestaurant({
	_type = "FastFoodRestaurant",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
