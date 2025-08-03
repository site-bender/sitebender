import type BaseProps from "../../../../../types/index.ts"
import type { TrainStation as TrainStationProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = TrainStationProps & BaseProps

export default function TrainStation({
	_type = "TrainStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
