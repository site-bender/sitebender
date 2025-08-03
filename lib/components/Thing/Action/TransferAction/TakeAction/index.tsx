import type BaseProps from "../../../../../types/index.ts"
import type { TakeAction as TakeActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = TakeActionProps & BaseProps

export default function TakeAction({
	_type = "TakeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
