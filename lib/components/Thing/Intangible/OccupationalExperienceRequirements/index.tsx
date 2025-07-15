import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type OccupationalExperienceRequirementsProps from "../../../../types/Thing/OccupationalExperienceRequirements/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	OccupationalExperienceRequirementsProps,
	"OccupationalExperienceRequirements",
	ExtractLevelProps<OccupationalExperienceRequirementsProps, IntangibleProps>
>

export default function OccupationalExperienceRequirements(
	{
		monthsOfExperience,
		schemaType = "OccupationalExperienceRequirements",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				monthsOfExperience,
				...subtypeProperties,
			}}
		/>
	)
}
