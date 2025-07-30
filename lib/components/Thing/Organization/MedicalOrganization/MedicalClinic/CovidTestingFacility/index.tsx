import type BaseProps from "../../../../../../types/index.ts"
import type CovidTestingFacilityProps from "../../../../../../types/Thing/Organization/MedicalOrganization/MedicalClinic/CovidTestingFacility/index.ts"

import MedicalClinic from "../index.tsx"

export type Props = CovidTestingFacilityProps & BaseProps

export default function CovidTestingFacility({
	_type = "CovidTestingFacility",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalClinic
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalClinic>
	)
}
