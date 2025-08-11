import type BaseProps from "../../../../../types/index.ts"
import type { CategoryCode as CategoryCodeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CategoryCodeProps & BaseProps

export default function CategoryCode({
	_type = "CategoryCode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
