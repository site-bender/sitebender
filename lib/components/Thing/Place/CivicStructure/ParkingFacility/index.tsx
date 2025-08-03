import type BaseProps from "../../../../../types/index.ts"
import type { ParkingFacility as ParkingFacilityProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = ParkingFacilityProps & BaseProps

export default function ParkingFacility({
	_type = "ParkingFacility",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
