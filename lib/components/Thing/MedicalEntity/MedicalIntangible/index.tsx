import type BaseProps from "../../../../types/index.ts"
import type { MedicalIntangible as MedicalIntangibleProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalIntangibleProps & BaseProps

export default function MedicalIntangible({
	_type = "MedicalIntangible",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
