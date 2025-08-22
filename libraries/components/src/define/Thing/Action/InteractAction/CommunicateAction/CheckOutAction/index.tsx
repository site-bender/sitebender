import type BaseProps from "../../../../../../types/index.ts"
import type { CheckOutAction as CheckOutActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CheckOutActionProps & BaseProps

export default function CheckOutAction({
	_type = "CheckOutAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
