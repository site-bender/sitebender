import type BaseProps from "../../../../../types/index.ts"
import type { CollegeOrUniversityProps } from "../../../../../types/Thing/Organization/EducationalOrganization/CollegeOrUniversity/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = CollegeOrUniversityProps & BaseProps

export default function CollegeOrUniversity({
	_type = "CollegeOrUniversity",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EducationalOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
