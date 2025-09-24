import type BaseProps from "../../../../../../types/index.ts"
import type { Bridge as BridgeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BridgeProps & BaseProps

export default function Bridge({
	_type = "Bridge",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
