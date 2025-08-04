import type BaseProps from "../../../../../../types/index.ts"
import type { Distillery as DistilleryProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DistilleryProps & BaseProps

export default function Distillery({
	_type = "Distillery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
