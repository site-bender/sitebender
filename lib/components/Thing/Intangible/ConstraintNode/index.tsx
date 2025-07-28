import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ConstraintNodeProps } from "../../../../types/Thing/Intangible/ConstraintNode/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ConstraintNodeProps,
	"ConstraintNode",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function ConstraintNode({
	constraintProperty,
	numConstraints,
	schemaType = "ConstraintNode",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				constraintProperty,
				numConstraints,
				...subtypeProperties,
			}}
		/>
	)
}
