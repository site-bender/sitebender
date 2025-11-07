import type BaseProps from "../../../../../../../types/index.ts"
import type { Reservoir as ReservoirProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ReservoirProps & BaseProps

export default function Reservoir({
	_type = "Reservoir",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
