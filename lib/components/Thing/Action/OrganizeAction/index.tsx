import type BaseProps from "../../../../types/index.ts"
import type { OrganizeAction as OrganizeActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = OrganizeActionProps & BaseProps

export default function OrganizeAction({
	_type = "OrganizeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
