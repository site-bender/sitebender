import type BaseProps from "../../../../types/index.ts"
import type ActionAccessSpecificationProps from "../../../../types/Thing/Intangible/ActionAccessSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = ActionAccessSpecificationProps & BaseProps

export default function ActionAccessSpecification({
	availabilityEnds,
	availabilityStarts,
	category,
	eligibleRegion,
	expectsAcceptanceOf,
	ineligibleRegion,
	requiresSubscription,
	_type = "ActionAccessSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
