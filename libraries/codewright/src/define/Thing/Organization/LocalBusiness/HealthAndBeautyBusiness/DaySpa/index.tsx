import type BaseProps from "../../../../../../../types/index.ts"
import type { DaySpa as DaySpaProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DaySpaProps & BaseProps

export default function DaySpa({
	_type = "DaySpa",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
