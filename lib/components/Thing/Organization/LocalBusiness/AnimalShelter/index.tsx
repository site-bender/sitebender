import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnimalShelterProps from "../../../../../types/Thing/AnimalShelter/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// AnimalShelter adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	AnimalShelterProps,
	"AnimalShelter",
	ExtractLevelProps<AnimalShelterProps, LocalBusinessProps>
>

export default function AnimalShelter({
	schemaType = "AnimalShelter",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
