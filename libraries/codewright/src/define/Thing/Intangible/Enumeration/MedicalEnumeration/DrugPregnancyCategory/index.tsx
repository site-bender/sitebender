import type BaseProps from "../../../../../../../types/index.ts"
import type { DrugPregnancyCategory as DrugPregnancyCategoryProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DrugPregnancyCategoryProps & BaseProps

export default function DrugPregnancyCategory({
	_type = "DrugPregnancyCategory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
