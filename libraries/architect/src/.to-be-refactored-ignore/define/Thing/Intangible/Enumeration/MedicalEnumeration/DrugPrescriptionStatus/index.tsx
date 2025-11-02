import type BaseProps from "../../../../../../../types/index.ts"
import type { DrugPrescriptionStatus as DrugPrescriptionStatusProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DrugPrescriptionStatusProps & BaseProps

export default function DrugPrescriptionStatus({
	_type = "DrugPrescriptionStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
