import type BaseProps from "../../../../../../types/index.ts"
import type { LakeBodyOfWater as LakeBodyOfWaterProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LakeBodyOfWaterProps & BaseProps

export default function LakeBodyOfWater({
	_type = "LakeBodyOfWater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
