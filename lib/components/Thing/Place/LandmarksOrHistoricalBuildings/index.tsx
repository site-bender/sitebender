import type BaseProps from "../../../../types/index.ts"
import type { LandmarksOrHistoricalBuildingsProps } from "../../../../types/Thing/Place/LandmarksOrHistoricalBuildings/index.ts"

import Place from "../index.tsx"

export type Props = LandmarksOrHistoricalBuildingsProps & BaseProps

export default function LandmarksOrHistoricalBuildings({
	_type = "LandmarksOrHistoricalBuildings",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
