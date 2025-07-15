import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ExerciseGymProps from "../../../../../../types/Thing/ExerciseGym/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "./index.tsx"

// ExerciseGym adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	ExerciseGymProps,
	"ExerciseGym",
	ExtractLevelProps<ExerciseGymProps, SportsActivityLocationProps>
>

export default function ExerciseGym({
	schemaType = "ExerciseGym",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
