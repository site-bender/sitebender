import type BaseProps from "../../../../../../types/index.ts"
import type { PlayGameAction as PlayGameActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PlayGameActionProps & BaseProps

export default function PlayGameAction({
	_type = "PlayGameAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
