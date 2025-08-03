import type BaseProps from "../../../../../../types/index.ts"
import type { GeoCircle as GeoCircleProps } from "../../../../../../types/index.ts"

import GeoShape from "../index.tsx"

export type Props = GeoCircleProps & BaseProps

export default function GeoCircle({
	_type = "GeoCircle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
