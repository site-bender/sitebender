import type BaseProps from "../../../../../types/index.ts"
import type { DrugLegalStatus as DrugLegalStatusProps } from "../../../../../types/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DrugLegalStatusProps & BaseProps

export default function DrugLegalStatus({
	_type = "DrugLegalStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
