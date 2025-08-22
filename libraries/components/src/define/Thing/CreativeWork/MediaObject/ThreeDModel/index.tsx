import type BaseProps from "../../../../../types/index.ts"
import type { ThreeDModel as ThreeDModelProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ThreeDModelProps & BaseProps

export default function ThreeDModel({
	_type = "ThreeDModel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
