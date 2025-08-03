import type BaseProps from "../../../../../types/index.ts"
import type { DrugStrength as DrugStrengthProps } from "../../../../../types/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DrugStrengthProps & BaseProps

export default function DrugStrength({
	_type = "DrugStrength",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
