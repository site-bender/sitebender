import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionAccessSpecificationProps from "../../../../types/Thing/ActionAccessSpecification/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ActionAccessSpecificationProps,
	"ActionAccessSpecification",
	ExtractLevelProps<ActionAccessSpecificationProps, IntangibleProps>
>

export default function ActionAccessSpecification(
	{
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
	}: Props,
) {
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
