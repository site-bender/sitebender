import type { Number } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface OccupationalExperienceRequirementsProps {
	/** Indicates the minimal number of months of experience required for a position. */
	monthsOfExperience?: Number
}

type OccupationalExperienceRequirements =
	& Thing
	& IntangibleProps
	& OccupationalExperienceRequirementsProps

export default OccupationalExperienceRequirements
