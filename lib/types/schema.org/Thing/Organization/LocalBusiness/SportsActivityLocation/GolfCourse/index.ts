import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export type GolfCourseType = "GolfCourse"

export interface GolfCourseProps {
	"@type"?: GolfCourseType
}

type GolfCourse =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& GolfCourseProps

export default GolfCourse
