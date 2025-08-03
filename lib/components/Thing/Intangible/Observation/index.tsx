import type BaseProps from "../../../../types/index.ts"
import type { Observation as ObservationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ObservationProps & BaseProps

export default function Observation({
	_type = "Observation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
