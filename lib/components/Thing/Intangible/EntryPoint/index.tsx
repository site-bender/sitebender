import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EntryPointProps from "../../../../types/Thing/EntryPoint/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	EntryPointProps,
	"EntryPoint",
	ExtractLevelProps<EntryPointProps, IntangibleProps>
>

export default function EntryPoint(
	{
		actionApplication,
		actionPlatform,
		application,
		contentType,
		encodingType,
		httpMethod,
		urlTemplate,
		schemaType = "EntryPoint",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actionApplication,
				actionPlatform,
				application,
				contentType,
				encodingType,
				httpMethod,
				urlTemplate,
				...subtypeProperties,
			}}
		/>
	)
}
