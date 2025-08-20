import Button from "~components/buttons/Button/index.tsx"
import ButtonBar from "~components/buttons/ButtonBar/index.tsx"
import BooleanField from "~components/forms/fields/BooleanField/index.tsx"
import ChooseOneField from "~components/forms/fields/ChooseOneField/index.tsx"
import EmailAddressField from "~components/forms/fields/EmailAddressField/index.tsx"
import FormattedTextField from "~components/forms/fields/FormattedTextField/index.tsx"
import PhoneNumberField from "~components/forms/fields/PhoneNumberField/index.tsx"
import TextField from "~components/forms/fields/TextField/index.tsx"
import TrileanField from "~components/forms/fields/TrileanField/index.tsx"
import TypeaheadTextField from "~components/forms/fields/TypeaheadTextField/index.tsx"
import UrlField from "~components/forms/fields/UrlField/index.tsx"
import FieldSet from "~components/forms/FieldSet/index.tsx"
import Form from "~components/forms/Form/index.tsx"

import createElement from "~utilities/createElement/index.ts"
// Make createElement available for JSX transformation in this module
import Fragment from "~utilities/Fragment/index.ts"

export type Props = Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "method"> & {}

export default function Test(props: Props) {
	return (
		<>
			<header>
				<h1 class="sr-only">Authentication</h1>
			</header>
			<Form action="/api/test" method="post" name="test-form" {...props}>
				<FieldSet legend="Test fields">
					<FormattedTextField
						countryCode="CA"
						format="postalCode"
						help="Please enter your postal code"
						label="Postal Code"
						name="postalCode"
						required
						submitFormatted
					/>
					<FormattedTextField
						format="zipPlus4"
						help="Please enter your zip code"
						label="Zip Code"
						name="zipCode"
						pattern="[0-9]{5}(-[0-9]{4})?"
						required
						submitFormatted
					/>
					<FormattedTextField
						format="creditCard"
						help="Please enter your credit card number"
						label="Credit Card Number"
						name="creditCardNumber"
						required
						submitFormatted
					/>
					<FormattedTextField
						format="isbn"
						help="Please enter the ISBN number"
						label="ISBN Number"
						name="isbn"
						required
						submitFormatted
					/>
					<EmailAddressField
						label="Email address"
						help="Please enter your email address"
						name="emailAddress"
						required
						inputAttributes={{
							maxLength: 100,
						}}
					/>
					<TextField
						autocomplete="true"
						help="Please enter your full name"
						inputAttributes={{
							maxLength: 100,
						}}
						label="Name"
						name="name"
						required
						size={12}
					/>
					<UrlField
						label="Website URL"
						help="Please enter the URL of your website"
						name="url"
						inputAttributes={{
							maxLength: 200,
						}}
					/>
					<TextField
						label="Biography"
						help="Please tell us about yourself"
						isMultiline
						name="bio"
						rows={5}
						textareaAttributes={{ maxLength: 1000 }}
					/>
					<BooleanField
						label="Do you agree?"
						help="Please indicate whether you agree to the terms"
						name="agree"
						required
					/>
					<BooleanField
						label="Do you really agree?"
						help="Please indicate whether you really agree to the terms"
						name="really-agree"
						required
						use="radio"
					/>
					<BooleanField
						label="Do you really really agree?"
						help="Please indicate whether you really really agree to the terms"
						name="really-really-agree"
						required
						use="select"
					/>
					<TrileanField
						label="Do you really and truly agree?"
						help="Please indicate whether you agree to the terms"
						name="agree"
						required
					/>
					<TrileanField
						help="Please indicate your participation status"
						initialValue="yes"
						label="Are you participating?"
						maybe="I'm not sure yet"
						name="participating"
						no="No, I'm not participating"
						use="select"
						yes="Yes, I'm participating"
					/>
					<ChooseOneField
						label="What's your favorite color?"
						help="If you're cool, you'll pick blue"
						name="color"
						options={[
							{ label: "Red", value: "red" },
							{ label: "Yellow", value: "yellow" },
							{ label: "Green", value: "green" },
							{ label: "Cyan", value: "cyan" },
							{ checked: true, label: "Blue", value: "blue" },
							{ label: "Magenta", value: "magenta" },
							{ label: "Black", value: "black" },
							{ label: "White", value: "white" },
							{ label: "Gunmetal gray", value: "gunmetalGray" },
						]}
						required
					/>
					<ChooseOneField
						help="If you're cool, you'll pick tiramisu"
						label="What's your favorite dessert?"
						name="color"
						options={[
							{ checked: true, label: "Tiramisu", value: "tiramisu" },
							{ label: "Crème brûlée", value: "crème brûlée" },
							{ label: "Chocolate mousse", value: "chocolate mousse" },
							{ label: "Gâteau chocolate", value: "gâteau chocolate" },
						]}
						required
					/>
					<TypeaheadTextField
						chooseMany
						label="Choose colors"
						help="Start typing to see suggestions"
						name="color"
						options={[
							"red",
							"yellow",
							"green",
							"cyan",
							"blue",
							"magenta",
							"black",
							"white",
							"gunmetalGray",
						]}
					/>
					<PhoneNumberField
						label="Phone number"
						help="Please enter your phone number for account recovery"
						name="phoneNumber"
						showChannels
						showUsage
						showType
					/>
				</FieldSet>

				<ButtonBar>
					<Button type="submit">Create account</Button>
				</ButtonBar>
			</Form>
		</>
	)
}
