import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Schedule from "../../Intangible/Schedule/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

import { Schedule as ScheduleComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

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
