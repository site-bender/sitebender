import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type Person from "../../Person/index.ts"
import type Schedule from "../../Intangible/Schedule/index.ts"

import CourseInstanceComponent from "../../../../../components/Thing/Event/CourseInstance/index.tsx"

export interface CourseInstanceProps {
	courseMode?: Text | URL
	courseSchedule?: Schedule
	courseWorkload?: Text
	instructor?: Person
}

type CourseInstance =
	& Thing
	& EventProps
	& CourseInstanceProps

export default CourseInstance
