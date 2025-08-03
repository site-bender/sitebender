import type BaseProps from "../../../../types/index.ts"
import type { Cooperative as CooperativeProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = CooperativeProps & BaseProps

export default function Cooperative({
	_type = "Cooperative",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
