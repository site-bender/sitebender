import type BaseProps from "../../../../../../types/index.ts"
import type { OceanBodyOfWater as OceanBodyOfWaterProps } from "../../../../../../types/index.ts"

import BodyOfWater from "../index.tsx"

export type Props = OceanBodyOfWaterProps & BaseProps

export default function OceanBodyOfWater({
	_type = "OceanBodyOfWater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
