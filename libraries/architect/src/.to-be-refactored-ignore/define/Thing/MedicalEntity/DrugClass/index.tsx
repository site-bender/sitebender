import type BaseProps from "../../../../../types/index.ts"
import type { DrugClass as DrugClassProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DrugClassProps & BaseProps

export default function DrugClass({
	_type = "DrugClass",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
