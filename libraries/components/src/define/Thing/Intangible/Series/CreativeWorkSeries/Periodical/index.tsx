import type BaseProps from "../../../../../../../types/index.ts"
import type { Periodical as PeriodicalProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// Periodical adds no properties to the ListItem schema type
export type Props = PeriodicalProps & BaseProps

export default function Periodical({
	_type = "Periodical",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
