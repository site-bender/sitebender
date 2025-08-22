import type BaseProps from "../../../../../types/index.ts"
import type { MedicalGuidelineContraindication as MedicalGuidelineContraindicationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalGuidelineContraindicationProps & BaseProps

export default function MedicalGuidelineContraindication({
	_type = "MedicalGuidelineContraindication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
