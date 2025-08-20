import type BaseProps from "../../../../../../types/index.ts"
import type { FMRadioChannel as FMRadioChannelProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = FMRadioChannelProps & BaseProps

export default function FMRadioChannel({
	_type = "FMRadioChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
