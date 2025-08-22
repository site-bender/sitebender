import type BaseProps from "../../../../../types/index.ts"
import type { SendAction as SendActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SendActionProps & BaseProps

export default function SendAction({
	_type = "SendAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
