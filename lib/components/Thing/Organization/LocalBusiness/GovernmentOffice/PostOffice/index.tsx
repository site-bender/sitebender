import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GovernmentOfficeProps from "../../../../../../types/Thing/GovernmentOffice/index.ts"
import type PostOfficeProps from "../../../../../../types/Thing/PostOffice/index.ts"

import GovernmentOffice from "../index.tsx"

// PostOffice adds no properties to the GovernmentOffice schema type
export type Props = BaseComponentProps<
	PostOfficeProps,
	"PostOffice",
	ExtractLevelProps<PostOfficeProps, GovernmentOfficeProps>
>

export default function PostOffice({
	schemaType = "PostOffice",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<GovernmentOffice
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
