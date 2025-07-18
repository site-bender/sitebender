import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"
import type FilmActionProps from "../../../../../types/Thing/FilmAction/index.ts"

import CreateAction from "../index.tsx"

// FilmAction adds no properties to the CreateAction schema type
export type Props = BaseComponentProps<
	FilmActionProps,
	"FilmAction",
	ExtractLevelProps<FilmActionProps, CreateActionProps>
>

export default function FilmAction({
	schemaType = "FilmAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
