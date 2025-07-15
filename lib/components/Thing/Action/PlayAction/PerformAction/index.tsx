import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PerformActionProps from "../../../../../types/Thing/PerformAction/index.ts"
import type PlayActionProps from "../../../../../types/Thing/PlayAction/index.ts"

import PlayAction from "./index.tsx"

export type Props = BaseComponentProps<
	PerformActionProps,
	"PerformAction",
	ExtractLevelProps<PerformActionProps, PlayActionProps>
>

export default function PerformAction(
	{
		entertainmentBusiness,
		schemaType = "PerformAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PlayAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				entertainmentBusiness,
				...subtypeProperties,
			}}
		/>
	)
}
