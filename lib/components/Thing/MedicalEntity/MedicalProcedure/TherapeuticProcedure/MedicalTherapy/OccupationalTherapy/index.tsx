import type BaseProps from "../../../../../../../types/index.ts"
import type { OccupationalTherapy as OccupationalTherapyProps } from "../../../../../../../types/index.ts"

import MedicalTherapy from "../index.tsx"

export type Props = OccupationalTherapyProps & BaseProps

export default function OccupationalTherapy({
	_type = "OccupationalTherapy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
