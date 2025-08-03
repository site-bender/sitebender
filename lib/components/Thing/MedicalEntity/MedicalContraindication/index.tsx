import type BaseProps from "../../../../types/index.ts"
import type { MedicalContraindication as MedicalContraindicationProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalContraindicationProps & BaseProps

export default function MedicalContraindication({
	_type = "MedicalContraindication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
