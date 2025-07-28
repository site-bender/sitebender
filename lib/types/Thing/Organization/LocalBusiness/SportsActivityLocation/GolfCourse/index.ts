import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import GolfCourseComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/SportsActivityLocation/GolfCourse/index.tsx"

export interface GolfCourseProps {
}

type GolfCourse =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& GolfCourseProps

export default GolfCourse
