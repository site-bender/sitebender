import type BaseProps from "../../../../../../types/index.ts"
import type { NutritionInformation as NutritionInformationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = NutritionInformationProps & BaseProps

export default function NutritionInformation({
	_type = "NutritionInformation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
