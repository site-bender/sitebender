import type BaseProps from "../../../../types/index.ts"
import type ConstraintNodeProps from "../../../../types/Thing/Intangible/ConstraintNode/index.ts"

import Intangible from "../index.tsx"

export type Props = ConstraintNodeProps & BaseProps

export default function ConstraintNode({
	constraintProperty,
	numConstraints,
	_type = "ConstraintNode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				constraintProperty,
				numConstraints,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
