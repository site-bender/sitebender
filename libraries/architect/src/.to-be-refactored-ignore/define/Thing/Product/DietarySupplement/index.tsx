import type BaseProps from "../../../../../types/index.ts"
import type { DietarySupplement as DietarySupplementProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DietarySupplementProps & BaseProps

export default function DietarySupplement({
	_type = "DietarySupplement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
