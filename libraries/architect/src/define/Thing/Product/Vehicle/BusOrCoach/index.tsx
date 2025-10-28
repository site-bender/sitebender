import type BaseProps from "../../../../../../types/index.ts"
import type { BusOrCoach as BusOrCoachProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusOrCoachProps & BaseProps

export default function BusOrCoach({
	_type = "BusOrCoach",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
