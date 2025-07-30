import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Schedule from "../../Intangible/Schedule/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

import ScheduleComponent from "../../../../components/Thing/Intangible/Schedule/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface CourseInstanceProps {
	"@type"?: "CourseInstance"
	courseMode?: Text | URL
	courseSchedule?: Schedule | ReturnType<typeof ScheduleComponent>
	courseWorkload?: Text
	instructor?: Person | ReturnType<typeof PersonComponent>
}

type CourseInstance = Thing & EventProps & CourseInstanceProps

export default CourseInstance
