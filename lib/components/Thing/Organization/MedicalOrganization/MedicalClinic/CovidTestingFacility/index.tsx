import type BaseProps from "../../../../../../types/index.ts"
import type { CovidTestingFacility as CovidTestingFacilityProps } from "../../../../../../types/index.ts"

import MedicalClinic from "../index.tsx"

export type Props = CovidTestingFacilityProps & BaseProps

export default function CovidTestingFacility({
	_type = "CovidTestingFacility",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
