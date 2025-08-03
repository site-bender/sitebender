import type BaseProps from "../../../../types/index.ts"
import type { AchieveAction as AchieveActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = AchieveActionProps & BaseProps

export default function AchieveAction({
	_type = "AchieveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
