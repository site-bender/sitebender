import type BaseProps from "../../../../../../types/index.ts"
import type { BarOrPub as BarOrPubProps } from "../../../../../../types/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = BarOrPubProps & BaseProps

export default function BarOrPub({
	_type = "BarOrPub",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
