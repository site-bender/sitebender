import type BaseProps from "../../../../../../types/index.ts"
import type { Bakery as BakeryProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BakeryProps & BaseProps

export default function Bakery({
	_type = "Bakery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
