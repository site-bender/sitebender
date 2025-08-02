import type BaseProps from "../../../../../types/index.ts"
import type SchoolProps from "../../../../../types/Thing/Organization/EducationalOrganization/School/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = SchoolProps & BaseProps

export default function School({
	_type = "School",
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
		>
			{children}
		</EducationalOrganization>
	)
}
