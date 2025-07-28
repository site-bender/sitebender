import type BaseProps from "../../../../../types/index.ts"
import type { SchoolDistrictProps } from "../../../../../types/Thing/Place/AdministrativeArea/SchoolDistrict/index.ts"

import AdministrativeArea from "../index.tsx"

export type Props = SchoolDistrictProps & BaseProps

export default function SchoolDistrict({
	_type = "SchoolDistrict",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AdministrativeArea
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
