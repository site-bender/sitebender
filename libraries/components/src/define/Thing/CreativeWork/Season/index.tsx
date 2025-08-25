import type BaseProps from "../../../../../types/index.ts"
import type { Season as SeasonProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SeasonProps & BaseProps

export default function Season({
	_type = "Season",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
