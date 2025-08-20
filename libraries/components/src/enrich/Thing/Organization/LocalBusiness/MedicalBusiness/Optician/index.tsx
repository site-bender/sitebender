import type BaseProps from "../../../../../../types/index.ts"
import type { Optician as OpticianProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = OpticianProps & BaseProps

export default function Optician({
	_type = "Optician",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
