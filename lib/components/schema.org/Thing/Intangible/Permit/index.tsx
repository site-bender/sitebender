import type BaseProps from "../../../../types/index.ts"
import type { Permit as PermitProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PermitProps & BaseProps

export default function Permit({
	_type = "Permit",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
