import type BaseProps from "../../../../types/index.ts"
import type { ActionAccessSpecification as ActionAccessSpecificationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ActionAccessSpecificationProps & BaseProps

export default function ActionAccessSpecification({
	_type = "ActionAccessSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
