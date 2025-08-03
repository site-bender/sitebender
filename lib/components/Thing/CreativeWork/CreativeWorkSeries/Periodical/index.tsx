import type BaseProps from "../../../../../types/index.ts"
import type { Periodical as PeriodicalProps } from "../../../../../types/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = PeriodicalProps & BaseProps

export default function Periodical({
	_type = "Periodical",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
