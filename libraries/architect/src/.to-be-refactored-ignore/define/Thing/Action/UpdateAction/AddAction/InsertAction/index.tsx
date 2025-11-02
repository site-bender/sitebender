import type BaseProps from "../../../../../../../types/index.ts"
import type { InsertAction as InsertActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = InsertActionProps & BaseProps

export default function InsertAction({
	_type = "InsertAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
