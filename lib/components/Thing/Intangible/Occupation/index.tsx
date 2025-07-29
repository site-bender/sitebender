import type BaseProps from "../../../../types/index.ts"
import type OccupationProps from "../../../../types/Thing/Intangible/Occupation/index.ts"

import Intangible from "../index.tsx"

export type Props = OccupationProps & BaseProps

export default function Occupation({
	educationRequirements,
	estimatedSalary,
	experienceRequirements,
	occupationalCategory,
	occupationLocation,
	qualifications,
	responsibilities,
	skills,
	_type = "Occupation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
