import type BaseProps from "../../../../types/index.ts"
import type { LandmarksOrHistoricalBuildings as LandmarksOrHistoricalBuildingsProps } from "../../../../types/index.ts"

import Place from "../index.tsx"

export type Props = LandmarksOrHistoricalBuildingsProps & BaseProps

export default function LandmarksOrHistoricalBuildings({
	_type = "LandmarksOrHistoricalBuildings",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
