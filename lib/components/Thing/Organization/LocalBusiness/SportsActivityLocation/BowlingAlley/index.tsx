import type BaseProps from "../../../../../../types/index.ts"
import type { BowlingAlley as BowlingAlleyProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BowlingAlleyProps & BaseProps

export default function BowlingAlley({
	_type = "BowlingAlley",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
