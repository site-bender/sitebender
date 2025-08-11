import type BaseProps from "../../../types/index.ts"
import type { MedicalEntity as MedicalEntityProps } from "../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = MedicalEntityProps & BaseProps

export default function MedicalEntity({
	_type = "MedicalEntity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
