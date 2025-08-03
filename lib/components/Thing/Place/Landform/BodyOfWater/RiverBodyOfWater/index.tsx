import type BaseProps from "../../../../../../types/index.ts"
import type { RiverBodyOfWater as RiverBodyOfWaterProps } from "../../../../../../types/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = RiverBodyOfWaterProps & BaseProps

export default function RiverBodyOfWater({
	_type = "RiverBodyOfWater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
