import type BaseProps from "../../../../../types/index.ts"
import type { SelfStorage as SelfStorageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SelfStorageProps & BaseProps

export default function SelfStorage({
	_type = "SelfStorage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
