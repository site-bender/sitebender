import type BaseProps from "../../../../../types/index.ts"
import type { Message as MessageProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MessageProps & BaseProps

export default function Message({
	_type = "Message",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
