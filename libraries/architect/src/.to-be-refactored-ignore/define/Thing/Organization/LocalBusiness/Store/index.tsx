import type BaseProps from "../../../../../../types/index.ts"
import type { Store as StoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = StoreProps & BaseProps

export default function Store({
	_type = "Store",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
