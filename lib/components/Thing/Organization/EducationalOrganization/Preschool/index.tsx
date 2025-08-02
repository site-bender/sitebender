import type BaseProps from "../../../../../types/index.ts"
import type PreschoolProps from "../../../../../types/Thing/Organization/EducationalOrganization/Preschool/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = PreschoolProps & BaseProps

export default function Preschool({
	_type = "Preschool",
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
