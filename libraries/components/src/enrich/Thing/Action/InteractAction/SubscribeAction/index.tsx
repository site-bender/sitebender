import type BaseProps from "../../../../../types/index.ts"
import type { SubscribeAction as SubscribeActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SubscribeActionProps & BaseProps

export default function SubscribeAction({
	_type = "SubscribeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
