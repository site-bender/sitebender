import type BaseProps from "../../../../../types/index.ts"
import type { Corporation as CorporationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CorporationProps & BaseProps

export default function Corporation({
	_type = "Corporation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
