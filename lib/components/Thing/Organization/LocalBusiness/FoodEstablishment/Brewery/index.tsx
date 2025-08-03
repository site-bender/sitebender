import type BaseProps from "../../../../../../types/index.ts"
import type { Brewery as BreweryProps } from "../../../../../../types/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = BreweryProps & BaseProps

export default function Brewery({
	_type = "Brewery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
