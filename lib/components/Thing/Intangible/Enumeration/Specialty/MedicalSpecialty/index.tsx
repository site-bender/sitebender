import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalSpecialty as MedicalSpecialtyProps } from "../../../../../../types/index.ts"

import Specialty from "../index.tsx"

// MedicalSpecialty adds no properties to the ListItem schema type
export type Props = MedicalSpecialtyProps & BaseProps

export default function MedicalSpecialty({
	_type = "MedicalSpecialty",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
