import type BaseProps from "../../../../types/index.ts"
import type { Quantity as QuantityProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = QuantityProps & BaseProps

export default function Quantity({
	_type = "Quantity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
