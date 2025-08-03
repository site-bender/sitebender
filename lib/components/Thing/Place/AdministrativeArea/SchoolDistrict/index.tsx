import type BaseProps from "../../../../../types/index.ts"
import type { SchoolDistrict as SchoolDistrictProps } from "../../../../../types/index.ts"

import AdministrativeArea from "../index.tsx"

export type Props = SchoolDistrictProps & BaseProps

export default function SchoolDistrict({
	_type = "SchoolDistrict",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
