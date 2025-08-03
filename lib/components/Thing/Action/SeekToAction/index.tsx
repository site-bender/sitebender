import type BaseProps from "../../../../types/index.ts"
import type { SeekToAction as SeekToActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = SeekToActionProps & BaseProps

export default function SeekToAction({
	_type = "SeekToAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
