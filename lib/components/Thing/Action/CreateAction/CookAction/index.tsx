import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CookActionProps from "../../../../../types/Thing/CookAction/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"

import CreateAction from "./index.tsx"

export type Props = BaseComponentProps<
	CookActionProps,
	"CookAction",
	ExtractLevelProps<CookActionProps, CreateActionProps>
>

export default function CookAction(
	{
		foodEstablishment,
		foodEvent,
		recipe,
		schemaType = "CookAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
