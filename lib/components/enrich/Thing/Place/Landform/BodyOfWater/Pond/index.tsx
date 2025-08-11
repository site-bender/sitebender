import type BaseProps from "../../../../../../types/index.ts"
import type { Pond as PondProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = PondProps & BaseProps

export default function Pond({
	_type = "Pond",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
