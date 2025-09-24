import type BaseProps from "../../../../../../types/index.ts"
import type { CategoryCodeSet as CategoryCodeSetProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CategoryCodeSetProps & BaseProps

export default function CategoryCodeSet({
	_type = "CategoryCodeSet",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
