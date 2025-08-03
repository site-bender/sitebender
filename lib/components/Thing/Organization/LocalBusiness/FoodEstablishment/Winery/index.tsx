import type BaseProps from "../../../../../../types/index.ts"
import type { Winery as WineryProps } from "../../../../../../types/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = WineryProps & BaseProps

export default function Winery({
	_type = "Winery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
