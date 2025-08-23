import type { CommunicationChannel, PhoneType } from "~types/forms/index.ts"

import type { Props as HelpProps } from "~components/forms/elements/Help/index.tsx"
import type { Props as InputProps } from "~components/forms/elements/Input/index.tsx"
import type { Props as LabelProps } from "~components/forms/elements/Label/index.tsx"
import type { Props as SelectProps } from "~components/forms/elements/Select/index.tsx"

import CheckboxGroup from "~components/forms/composites/CheckboxGroup/index.tsx"
import Legend from "~components/forms/composites/Legend/index.tsx"
import RadioGroup from "~components/forms/composites/RadioGroup/index.tsx"
import Input from "~components/forms/elements/Input/index.tsx"
import Label from "~components/forms/elements/Label/index.tsx"
import Select from "~components/forms/elements/Select/index.tsx"
import FieldSet from "~components/forms/FieldSet/index.tsx"

import createElement from "~utilities/createElement/index.ts"
import generateShortId from "~utilities/generateShortId/index.ts"

import { CHANNEL_LABELS, TYPE_LABELS } from "~constants/forms/index.ts"

import getCountryDialingOptions from "./getCountryDialingOptions/index.ts"
import getDialingCodeOptions from "./getDialingCodeOptions/index.ts"

export type Props =
	& Omit<
		JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>,
		"id"
	>
	& {
		extension?: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "placeholder">
		help?: string | HelpProps
		id?: string
		input?: InputProps
		label?: string | LabelProps
		name?: string
		required?: boolean
		select?: SelectProps
		showCountry?: boolean
		showChannels?: boolean
		showUsage?: boolean
		showType?: boolean
		defaultChannels?: Array<CommunicationChannel>
		defaultPersonal?: boolean
		defaultWork?: boolean
		defaultType?: PhoneType
	}

const channelOptions: Array<{ label: string; value: string }> = Object.entries(
	CHANNEL_LABELS,
).reduce(
	(acc, [value, label]) => [
		...acc,
		{
			label,
			value,
		},
	],
	[] as Array<{ label: string; value: string }>,
)

const useOptions: Array<{ label: string; value: string }> = [
	{
		label: "Personal",
		value: "personal",
	},
	{
		label: "Work",
		value: "work",
	},
]

const typeOptions: Array<{ label: string; value: string }> = Object.entries(
	TYPE_LABELS,
).reduce(
	(acc, [value, label]) => [
		...acc,
		{
			label,
			value,
		},
	],
	[] as Array<{ label: string; value: string }>,
)

export default function PhoneNumberField({
	extension = {},
	help = "Enter your phone number",
	id = generateShortId(),
	input = {},
	label = "Phone Number",
	name = "phone-number",
	required = false,
	select,
	showCountry = false,
	showChannels = false,
	showUsage = false,
	showType = false,
	defaultChannels = [],
	defaultPersonal = false,
	defaultWork = false,
	defaultType,
	...props
}: Props) {
	const options = showCountry
		? getCountryDialingOptions()
		: getDialingCodeOptions()

	// Determine if sections should be open based on whether they have defaults
	const channelsOpen = defaultChannels.length > 0
	const usageOpen = defaultPersonal || defaultWork
	const typeOpen = defaultType !== undefined

	// Create unique IDs for all form elements
	const channelsId = `${id}-channels`
	const countryCodeId = `${id}-country-code`
	const extId = `${id}-extension`
	const legendId = `${id}-legend`
	const numberId = `${id}-number`
	const typeId = `${id}-type`
	const usageId = `${id}-usage`

	return (
		<FieldSet class="form-field phone-number-field" {...props}>
			<Legend help={help} id={id} label={label} />

			<div class="phone-number-inputs">
				<Label classes={["phone-number-label"]} id={countryCodeId}>
					<div class="country-code-label">Code</div>
					<Select
						aria-describedby={legendId}
						aria-required={required}
						autocomplete="on"
						id={countryCodeId}
						name={`${name}-country-code`}
						required={required}
						options={options}
						{...select}
					/>
				</Label>

				<Label classes={["phone-number-label"]} id={numberId}>
					<div class="phone-number-label">Number</div>
					<Input
						aria-describedby={legendId}
						aria-required={required}
						autocomplete="on"
						id={numberId}
						name={`${name}-number`}
						pattern="[0-9]+"
						required={required}
						type="tel"
						{...input}
					/>
				</Label>

				<Label classes={["phone-number-label"]} id={extId}>
					<div class="extension-label">Ext</div>
					<Input
						aria-describedby={legendId}
						autocomplete="on"
						id={extId}
						name={`${name}-extension`}
						pattern="[0-9]+"
						type="number"
						{...extension}
					/>
				</Label>
			</div>

			{showChannels && (
				<details class="communication-channels" open={channelsOpen}>
					<summary>Communication preferences</summary>
					<CheckboxGroup
						aria-describedby={legendId}
						classes={["form-field", "channels"]}
						id={channelsId}
						label="How may we contact you at this number?"
						name={name}
						options={channelOptions}
						{...props}
					/>
				</details>
			)}

			{showUsage && (
				<details class="phone-use" open={usageOpen}>
					<summary>Usage context</summary>
					<CheckboxGroup
						aria-describedby={legendId}
						classes={["form-field", "use"]}
						id={usageId}
						label="How is this phone used?"
						name={name}
						options={useOptions}
						{...props}
					/>
				</details>
			)}

			{showType && (
				<details class="device-type" open={typeOpen}>
					<summary>Phone type</summary>
					<RadioGroup
						classes={["form-field", "phone-type"]}
						id={typeId}
						label="What type of device is this?"
						name={name}
						options={typeOptions}
					/>
				</details>
			)}
		</FieldSet>
	)
}
