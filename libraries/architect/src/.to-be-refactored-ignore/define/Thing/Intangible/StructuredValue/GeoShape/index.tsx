import type BaseProps from "../../../../../../types/index.ts"
import type { GeoShape as GeoShapeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GeoShapeProps & BaseProps

export default function GeoShape({
	_type = "GeoShape",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
