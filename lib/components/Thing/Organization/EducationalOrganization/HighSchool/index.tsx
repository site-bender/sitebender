import type BaseProps from "../../../../../types/index.ts"
import type HighSchoolProps from "../../../../../types/Thing/Organization/EducationalOrganization/HighSchool/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = HighSchoolProps & BaseProps

export default function HighSchool({
	_type = "HighSchool",
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
