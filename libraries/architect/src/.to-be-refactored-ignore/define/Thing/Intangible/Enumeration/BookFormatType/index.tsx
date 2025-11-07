import type BaseProps from "../../../../../../types/index.ts"
import type { BookFormatType as BookFormatTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BookFormatTypeProps & BaseProps

export default function BookFormatType({
	_type = "BookFormatType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
