import type BaseProps from "../../../../../types/index.ts"
import type { Mass as MassProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MassProps & BaseProps

export default function Mass({
	_type = "Mass",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
