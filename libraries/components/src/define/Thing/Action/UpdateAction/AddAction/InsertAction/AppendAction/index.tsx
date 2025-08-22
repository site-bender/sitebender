import type BaseProps from "../../../../../../../types/index.ts"
import type { AppendAction as AppendActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = AppendActionProps & BaseProps

export default function AppendAction({
	_type = "AppendAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
