import type BaseProps from "../../../../../../types/index.ts"
import type GolfCourseProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/GolfCourse/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = GolfCourseProps & BaseProps

export default function GolfCourse({
	_type = "GolfCourse",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
