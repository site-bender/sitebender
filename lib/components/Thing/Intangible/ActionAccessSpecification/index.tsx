import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ActionAccessSpecificationProps } from "../../../../types/Thing/Intangible/ActionAccessSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ActionAccessSpecificationProps,
	"ActionAccessSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function ActionAccessSpecification({
	availabilityEnds,
	availabilityStarts,
	category,
	eligibleRegion,
	expectsAcceptanceOf,
	ineligibleRegion,
	requiresSubscription,
	schemaType = "ActionAccessSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availabilityEnds,
				availabilityStarts,
				category,
				eligibleRegion,
				expectsAcceptanceOf,
				ineligibleRegion,
				requiresSubscription,
				...subtypeProperties,
			}}
		/>
	)
}
