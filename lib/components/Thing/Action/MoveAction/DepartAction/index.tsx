import type BaseProps from "../../../../../types/index.ts"
import type { DepartAction as DepartActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DepartActionProps & BaseProps

export default function DepartAction({
	_type = "DepartAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
