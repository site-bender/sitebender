import generateShortId from "../../../helpers/generateShortId/index.ts"
import ErrorMessage from "../../feedback/ErrorMessage/index.tsx"
import LabelWrapper from "../composites/LabelWrapper/index.tsx"
import Input from "../elements/Input/index.tsx"
import TextArea from "../elements/TextArea/index.tsx"
import mergeDescribedBy from "../helpers/mergeDescribedBy/index.ts"

export type Props = {
	name: string
	label: string
	id?: string
	type?: string
	required?: boolean
	pattern?: string
	value?: string | number
	multiline?: boolean
	rows?: number
	help?: string
	classes?: Array<string>
	error?: string
} & Record<string, unknown>

export default function Field({
	name,
	label,
	id: suppliedId,
	type = "text",
	required = false,
	pattern,
	value,
	multiline = false,
	rows = 3,
	help,
	classes = [],
	error,
	...rest
}: Props) {
	const baseId = suppliedId || `${name}-${generateShortId()}`
	const helpId = help ? `${baseId}-help` : undefined
	const errorId = error ? `${baseId}-error` : undefined

	const controlProps = {
		id: `${baseId}-control`,
		name,
		required,
		pattern,
		value,
		"aria-required": required || undefined,
		"aria-invalid": error ? true : undefined,
		"aria-describedby": mergeDescribedBy(undefined, helpId, errorId),
		...rest,
	}

	const fieldClass = ["field", ...classes].join(" ")
	const control = multiline
		? <TextArea rows={rows} {...controlProps} />
		: <Input type={type} {...controlProps} />

	return (
		<div class={fieldClass}>
			<LabelWrapper label={label} id={baseId} help={help}>
				{control}
			</LabelWrapper>
			{error ? <ErrorMessage id={errorId}>{error}</ErrorMessage> : null}
		</div>
	)
}
