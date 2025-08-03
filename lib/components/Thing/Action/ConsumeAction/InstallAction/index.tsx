import type BaseProps from "../../../../../types/index.ts"
import type { InstallAction as InstallActionProps } from "../../../../../types/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = InstallActionProps & BaseProps

export default function InstallAction({
	_type = "InstallAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
