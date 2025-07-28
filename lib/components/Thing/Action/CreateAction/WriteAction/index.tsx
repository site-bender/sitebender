import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { CreateActionProps } from "../../../../../types/Thing/Action/CreateAction/index.ts"
import type { WriteActionProps } from "../../../../../types/Thing/Action/CreateAction/WriteAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = BaseComponentProps<
	WriteActionProps,
	"WriteAction",
	ExtractLevelProps<ThingProps, ActionProps, CreateActionProps>
>

export default function WriteAction({
	inLanguage,
	language,
	schemaType = "WriteAction",
	subtypeProperties = {},
	...props
}): Props {
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
