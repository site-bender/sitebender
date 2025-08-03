import type BaseProps from "../../../../../../types/index.ts"
import type { SeaBodyOfWater as SeaBodyOfWaterProps } from "../../../../../../types/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = SeaBodyOfWaterProps & BaseProps

export default function SeaBodyOfWater({
	_type = "SeaBodyOfWater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
