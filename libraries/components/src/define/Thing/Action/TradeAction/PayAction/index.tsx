import type BaseProps from "../../../../../types/index.ts"
import type { PayAction as PayActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PayActionProps & BaseProps

export default function PayAction({
	_type = "PayAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
