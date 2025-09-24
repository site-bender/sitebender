import type BaseProps from "../../../../../../../types/index.ts"
import type { LegislativeBuilding as LegislativeBuildingProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LegislativeBuildingProps & BaseProps

export default function LegislativeBuilding({
	_type = "LegislativeBuilding",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
