import type BaseProps from "../../../../../types/index.ts"
import type { WinAction as WinActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WinActionProps & BaseProps

export default function WinAction({
	_type = "WinAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
