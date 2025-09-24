import type BaseProps from "../../../../../../types/index.ts"
import type { BodyOfWater as BodyOfWaterProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BodyOfWaterProps & BaseProps

export default function BodyOfWater({
	_type = "BodyOfWater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
