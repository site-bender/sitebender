import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { OccupationProps } from "../../../../types/Thing/Intangible/Occupation/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	OccupationProps,
	"Occupation",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Occupation({
	educationRequirements,
	estimatedSalary,
	experienceRequirements,
	occupationalCategory,
	occupationLocation,
	qualifications,
	responsibilities,
	skills,
	schemaType = "Occupation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				educationRequirements,
				estimatedSalary,
				experienceRequirements,
				occupationalCategory,
				occupationLocation,
				qualifications,
				responsibilities,
				skills,
				...subtypeProperties,
			}}
		/>
	)
}
