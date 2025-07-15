import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../../types/Thing/AdministrativeArea/index.ts"
import type StateProps from "../../../../../types/Thing/State/index.ts"

import AdministrativeArea from "./index.tsx"

// State adds no properties to the AdministrativeArea schema type
export type Props = BaseComponentProps<
	StateProps,
	"State",
	ExtractLevelProps<StateProps, AdministrativeAreaProps>
>

export default function State({
	schemaType = "State",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AdministrativeArea
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
