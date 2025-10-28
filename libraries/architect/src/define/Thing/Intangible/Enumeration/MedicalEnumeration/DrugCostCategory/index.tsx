import type BaseProps from "../../../../../../../types/index.ts"
import type { DrugCostCategory as DrugCostCategoryProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DrugCostCategoryProps & BaseProps

export default function DrugCostCategory({
	_type = "DrugCostCategory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
