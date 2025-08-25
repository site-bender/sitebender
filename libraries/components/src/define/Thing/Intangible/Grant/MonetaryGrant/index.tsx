import type BaseProps from "../../../../../../types/index.ts"
import type { MonetaryGrant as MonetaryGrantProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MonetaryGrantProps & BaseProps

export default function MonetaryGrant({
	_type = "MonetaryGrant",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
