import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GolfCourseProps from "../../../../../../types/Thing/GolfCourse/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "../index.tsx"

// GolfCourse adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	GolfCourseProps,
	"GolfCourse",
	ExtractLevelProps<GolfCourseProps, SportsActivityLocationProps>
>

export default function GolfCourse({
	schemaType = "GolfCourse",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
