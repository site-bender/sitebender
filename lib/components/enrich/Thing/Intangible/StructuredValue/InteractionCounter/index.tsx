import type BaseProps from "../../../../../types/index.ts"
import type { InteractionCounter as InteractionCounterProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = InteractionCounterProps & BaseProps

export default function InteractionCounter({
	_type = "InteractionCounter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
