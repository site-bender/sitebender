import type BaseProps from "../../../../../types/index.ts"
import type { PhysicalActivityCategory as PhysicalActivityCategoryProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = PhysicalActivityCategoryProps & BaseProps

export default function PhysicalActivityCategory({
	_type = "PhysicalActivityCategory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
