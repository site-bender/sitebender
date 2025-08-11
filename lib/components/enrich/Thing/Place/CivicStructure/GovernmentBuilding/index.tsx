import type BaseProps from "../../../../../types/index.ts"
import type { GovernmentBuilding as GovernmentBuildingProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GovernmentBuildingProps & BaseProps

export default function GovernmentBuilding({
	_type = "GovernmentBuilding",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
