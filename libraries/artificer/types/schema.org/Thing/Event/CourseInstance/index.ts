import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Schedule from "../../Intangible/Schedule/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

import ScheduleComponent from "../../../../../../architect/src/define/Thing/Intangible/Schedule/index.tsx"
import PersonComponent from "../../../../../../architect/src/define/Thing/Person/index.tsx"

export type CourseInstanceType = "CourseInstance"

export interface CourseInstanceProps {
	"@type"?: CourseInstanceType
	courseMode?: Text | URL
	courseSchedule?: Schedule | ReturnType<typeof ScheduleComponent>
	courseWorkload?: Text
	instructor?: Person | ReturnType<typeof PersonComponent>
}

type CourseInstance = Thing & EventProps & CourseInstanceProps

export default CourseInstance
