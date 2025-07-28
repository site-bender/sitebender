import type BaseProps from "../../../../../types/index.ts"
import type { ElementarySchoolProps } from "../../../../../types/Thing/Organization/EducationalOrganization/ElementarySchool/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = ElementarySchoolProps & BaseProps

export default function ElementarySchool({
	_type = "ElementarySchool",
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
