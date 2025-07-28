import type { Number } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import OccupationalExperienceRequirementsComponent from "../../../../../components/Thing/Intangible/OccupationalExperienceRequirements/index.tsx"

export interface OccupationalExperienceRequirementsProps {
	monthsOfExperience?: Number
}

type OccupationalExperienceRequirements =
	& Thing
	& IntangibleProps
	& OccupationalExperienceRequirementsProps

export default OccupationalExperienceRequirements
