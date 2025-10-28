import type { Number } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type OccupationalExperienceRequirementsType =
	"OccupationalExperienceRequirements"

export interface OccupationalExperienceRequirementsProps {
	"@type"?: OccupationalExperienceRequirementsType
	monthsOfExperience?: Number
}

type OccupationalExperienceRequirements =
	& Thing
	& IntangibleProps
	& OccupationalExperienceRequirementsProps

export default OccupationalExperienceRequirements
