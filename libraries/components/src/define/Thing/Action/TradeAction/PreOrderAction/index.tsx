import type BaseProps from "../../../../../../types/index.ts"
import type { PreOrderAction as PreOrderActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PreOrderActionProps & BaseProps

export default function PreOrderAction({
	_type = "PreOrderAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
