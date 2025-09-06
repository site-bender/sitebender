import Button from "../../../buttons/Button/index.tsx"
import ButtonBar from "../../../buttons/ButtonBar/index.tsx"
import BooleanField from "../../fields/BooleanField/index.tsx"
import ChooseOneField from "../../fields/ChooseOneField/index.tsx"
import EmailAddressField from "../../fields/EmailAddressField/index.tsx"
import FormattedTextField from "../../fields/FormattedTextField/index.tsx"
import TextField from "../../fields/TextField/index.tsx"
import TrileanField from "../../fields/TrileanField/index.tsx"
import TypeaheadTextField from "../../fields/TypeaheadTextField/index.tsx"
import UrlField from "../../fields/UrlField/index.tsx"
import FieldSet from "../../FieldSet/index.tsx"
import Form from "../../Form/index.tsx"

export type Props = Record<PropertyKey, never> & Record<string, unknown>

export default function Test(props: Props) {
	return (
		<div>
			<header>
				<h1 class="sr-only">Authentication</h1>
			</header>
			<Form action="/api/test" method="POST" name="test-form" {...props}>
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
						inputAttributes={{ maxLength: 100 }}
					/>
					<TextField
						autoComplete="true"
						help="Please enter your full name"
						inputAttributes={{ maxLength: 100 }}
						label="Name"
						name="name"
						required
						size={12}
					/>
					<UrlField
						label="Website URL"
						help="Please enter the URL of your website"
						name="url"
						inputAttributes={{ maxLength: 200 }}
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
						name="really-and-truly-agree"
						required
					/>
					<ChooseOneField
						help="Please choose one option"
						label="Choose one"
						name="chooseOne"
						required
						options={[
							{ label: "Option A", value: "A" },
							{ label: "Option B", value: "B" },
							{ label: "Option C", value: "C" },
						]}
					/>
					<TypeaheadTextField
						label="Typeahead"
						help="Start typing to search"
						name="typeahead"
						required={false}
						options={["Alpha", "Bravo", "Charlie", "Delta", "Echo"]}
					/>
				</FieldSet>
				<ButtonBar position="bottom">
					<Button type="submit">Submit</Button>
				</ButtonBar>
			</Form>
		</div>
	)
}
