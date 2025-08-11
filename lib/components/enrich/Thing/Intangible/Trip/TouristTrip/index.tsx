import type BaseProps from "../../../../../types/index.ts"
import type { TouristTrip as TouristTripProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TouristTripProps & BaseProps

export default function TouristTrip({
	_type = "TouristTrip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
