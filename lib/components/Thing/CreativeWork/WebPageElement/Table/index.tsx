import type BaseProps from "../../../../../types/index.ts"
import type { Table as TableProps } from "../../../../../types/index.ts"

import WebPageElement from "../index.tsx"

export type Props = TableProps & BaseProps

export default function Table({
	_type = "Table",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
