import type BaseProps from "../../../../types/index.ts"
import type { DrugCost as DrugCostProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = DrugCostProps & BaseProps

export default function DrugCost({
	_type = "DrugCost",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
