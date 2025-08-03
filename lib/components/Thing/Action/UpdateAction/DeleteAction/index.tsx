import type BaseProps from "../../../../../types/index.ts"
import type { DeleteAction as DeleteActionProps } from "../../../../../types/index.ts"

import UpdateAction from "../index.tsx"

export type Props = DeleteActionProps & BaseProps

export default function DeleteAction({
	_type = "DeleteAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
