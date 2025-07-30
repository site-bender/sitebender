import type BaseProps from "../../../../../types/index.ts"
import type MiddleSchoolProps from "../../../../../types/Thing/Organization/EducationalOrganization/MiddleSchool/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = MiddleSchoolProps & BaseProps

export default function MiddleSchool({
	_type = "MiddleSchool",
	children,
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
		>{children}</EducationalOrganization>
	)
}
