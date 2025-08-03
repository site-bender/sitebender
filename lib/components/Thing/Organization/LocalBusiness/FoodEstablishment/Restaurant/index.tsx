import type BaseProps from "../../../../../../types/index.ts"
import type { Restaurant as RestaurantProps } from "../../../../../../types/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = RestaurantProps & BaseProps

export default function Restaurant({
	_type = "Restaurant",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
