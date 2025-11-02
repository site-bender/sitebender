import type BaseProps from "../../../../../../types/index.ts"
import type { RestrictedDiet as RestrictedDietProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RestrictedDietProps & BaseProps

export default function RestrictedDiet({
	_type = "RestrictedDiet",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
