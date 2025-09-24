import type BaseProps from "../../../../../../types/index.ts"
import type { PerformingArtsTheater as PerformingArtsTheaterProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PerformingArtsTheaterProps & BaseProps

export default function PerformingArtsTheater({
	_type = "PerformingArtsTheater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
