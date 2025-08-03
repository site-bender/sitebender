import type BaseProps from "../../../../../../types/index.ts"
import type { Motel as MotelProps } from "../../../../../../types/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = MotelProps & BaseProps

export default function Motel({
	_type = "Motel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
