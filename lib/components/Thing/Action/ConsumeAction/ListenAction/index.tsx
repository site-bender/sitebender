import type BaseProps from "../../../../../types/index.ts"
import type { ListenAction as ListenActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ListenActionProps & BaseProps

export default function ListenAction({
	_type = "ListenAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
