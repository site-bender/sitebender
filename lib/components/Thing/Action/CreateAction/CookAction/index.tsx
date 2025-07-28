import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { CreateActionProps } from "../../../../../types/Thing/Action/CreateAction/index.ts"
import type { CookActionProps } from "../../../../../types/Thing/Action/CreateAction/CookAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = BaseComponentProps<
	CookActionProps,
	"CookAction",
	ExtractLevelProps<ThingProps, ActionProps, CreateActionProps>
>

export default function CookAction({
	foodEstablishment,
	foodEvent,
	recipe,
	schemaType = "CookAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				foodEstablishment,
				foodEvent,
				recipe,
				...subtypeProperties,
			}}
		/>
	)
}
