import type BaseProps from "../../../../../../types/index.ts"
import type { PhysicalActivityCategory as PhysicalActivityCategoryProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PhysicalActivityCategoryProps & BaseProps

export default function PhysicalActivityCategory({
	_type = "PhysicalActivityCategory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
