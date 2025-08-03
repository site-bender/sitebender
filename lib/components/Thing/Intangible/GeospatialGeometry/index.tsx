import type BaseProps from "../../../../types/index.ts"
import type { GeospatialGeometry as GeospatialGeometryProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = GeospatialGeometryProps & BaseProps

export default function GeospatialGeometry({
	_type = "GeospatialGeometry",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
