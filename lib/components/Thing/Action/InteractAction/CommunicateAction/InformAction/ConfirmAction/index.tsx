import type BaseProps from "../../../../../../../types/index.ts"
import type { ConfirmAction as ConfirmActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = ConfirmActionProps & BaseProps

export default function ConfirmAction({
	_type = "ConfirmAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
