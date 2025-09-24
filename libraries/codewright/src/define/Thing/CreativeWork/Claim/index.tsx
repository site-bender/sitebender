import type BaseProps from "../../../../../types/index.ts"
import type { Claim as ClaimProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ClaimProps & BaseProps

export default function Claim({
	_type = "Claim",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
