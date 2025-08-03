import type BaseProps from "../../../../../types/index.ts"
import type { PoliceStation as PoliceStationProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PoliceStationProps & BaseProps

export default function PoliceStation({
	_type = "PoliceStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
