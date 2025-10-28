import type BaseProps from "../../../../../../../types/index.ts"
import type { HinduTemple as HinduTempleProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HinduTempleProps & BaseProps

export default function HinduTemple({
	_type = "HinduTemple",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
