import type BaseProps from "../../../../../types/index.ts"
import type { GeoCoordinates as GeoCoordinatesProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GeoCoordinatesProps & BaseProps

export default function GeoCoordinates({
	_type = "GeoCoordinates",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
