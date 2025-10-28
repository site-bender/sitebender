import type BaseProps from "../../../../../types/index.ts"
import type { Landform as LandformProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = LandformProps & BaseProps

export default function Landform({
	_type = "Landform",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
