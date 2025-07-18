import type { Number } from "../../../DataType/index.ts"
import type Intangible from "../index.ts"

export default interface OccupationalExperienceRequirements extends Intangible {
	/** Indicates the minimal number of months of experience required for a position. */
	monthsOfExperience?: Number
}
