import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"
import type WriteActionProps from "../../../../../types/Thing/WriteAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = BaseComponentProps<
	WriteActionProps,
	"WriteAction",
	ExtractLevelProps<WriteActionProps, CreateActionProps>
>

export default function WriteAction(
	{
		inLanguage,
		language,
		schemaType = "WriteAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inLanguage,
				language,
				...subtypeProperties,
			}}
		/>
	)
}
