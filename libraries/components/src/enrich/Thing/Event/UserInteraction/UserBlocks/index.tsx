import type BaseProps from "../../../../../types/index.ts"
import type { UserBlocks as UserBlocksProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UserBlocksProps & BaseProps

export default function UserBlocks({
	_type = "UserBlocks",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
