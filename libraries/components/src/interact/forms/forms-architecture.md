# Forms Architecture

## Overview

The forms components take a datatype-centric approach rather than an HTML-element-centric approach. Each form component is named after the type of data it handles, not the HTML element it uses.

A form component is not just an input element - it's a complete field that includes:

- Label
- Input element(s)
- Help text
- Error messages
- Validation feedback
- Accessibility features

## Component Naming Convention

Components are named after the datatype they handle:

### Boolean Types

- **BooleanField**: true/false (checkbox or toggle switch)
- **TrileanField**: true/false/null (three-state checkbox)

### Text Types

- **TextField**: Handles both single-line (`<input>`) and multi-line (`<textarea>`) text
- **PasswordField**: Secure text input
- **EmailField**: Email address with validation
- **UrlField**: URL with validation
- **SearchField**: Search-specific text input

### Numeric Types

- **NumberInput**: Numeric values with min/max/step
- **RangeInput**: Numeric value with slider
- **PercentageInput**: 0-100% values

### Selection Types

- **ChooseOneField**: Single selection from enumerated values (radio group, select)
- **ChooseSomeField**: Multiple selection from enumerated values (checkbox group, multi-select)
- **AutocompleteField**: Type-ahead selection from large datasets

### Temporal Types (JavaScript Temporal API)

_Note: These fields will use HTML5 temporal input types (date, time, datetime-local, etc.)
as their underlying elements, enhanced with Temporal API for precise date/time handling._

- **DateInput**: Date selection (PlainDate)
- **TimeInput**: Time selection (PlainTime)
- **DateTimeInput**: Combined date and time (PlainDateTime)
- **ZonedDateTimeInput**: Date/time with timezone (ZonedDateTime)
- **YearMonthInput**: Year and month only (PlainYearMonth)
- **MonthDayInput**: Month and day only (PlainMonthDay)
- **DurationInput**: Time durations (Duration)
- **InstantInput**: Exact moment in time (Instant)
- **WeekDayInput**: Day of week selection
- **WeekInput**: Week selection (ISO week)
- **QuarterInput**: Quarter selection (Q1-Q4)
- **TimeZoneInput**: Timezone selection

### File Types

- **FileInput**: Single file upload
- **MultiFileInput**: Multiple file upload
- **ImageInput**: Image-specific upload with preview
- **AvatarInput**: Profile picture upload with cropping

### Complex Types

- **ColorInput**: Color picker
- **DateRangeInput**: Start and end date selection
- **TimeRangeInput**: Start and end time selection
- **AddressInput**: Structured address input
- **LocationInput**: Geographic coordinates (lat/lng)
- **CreditCardInput**: Credit card information
- **PhoneInput**: International phone numbers

## Shared Utilities

Form components share utilities with semantic components:

### Calendars (`/lib/components/calendars/`)

- Calendar system support (Gregorian, Hebrew, Islamic, etc.)
- Week numbering systems
- Date calculations

### Formatters (`/lib/components/formatters/`)

- Date/time formatting with Intl.DateTimeFormat
- Number formatting with Intl.NumberFormat
- List formatting with Intl.ListFormat
- Relative time formatting
- Currency formatting
- Unit formatting

### Parsers (`/lib/components/parsers/`)

- Temporal string parsing (with bracket notation)
- Number parsing with locale support
- Date/time parsing
- Duration parsing

### Validators (`/lib/components/forms/validators/`)

- Email validation
- URL validation
- Phone number validation
- Credit card validation
- Custom validation rules

## Component Structure

Each form component follows this pattern:

```tsx
export type Props = {
	// Field props
	name: string
	label?: string
	value?: DataType
	defaultValue?: DataType
	onChange?: (value: DataType) => void

	// Validation
	required?: boolean
	validate?: (value: DataType) => string | undefined

	// Help/Error
	helpText?: string
	error?: string

	// Display
	disabled?: boolean
	readOnly?: boolean

	// Accessibility
	id?: string
	describedBy?: string
	// Component-specific props...
}
```

## Form Wrapper Components

- **Form**: Enhanced form element with validation and submission handling
- **Fieldset**: Group related fields with legend
- **FormGroup**: Layout wrapper for form fields
- **FormActions**: Container for form buttons

## Validation Strategy

- Client-side validation using native HTML5 validation where possible
- Custom validation functions for complex rules
- Async validation support for server-side checks
- Validation on blur, change, and submit
- Clear error messaging with field highlighting

## Accessibility

All form components will:

- Have proper label associations
- Include ARIA attributes for screen readers
- Support keyboard navigation
- Provide clear error announcements
- Include help text associations
- Support high contrast modes

## Internationalization

Form components will support:

- RTL languages
- Locale-specific formatting
- Translated labels and messages
- Cultural date/time conventions
- Locale-appropriate validation

## Architecture Layers

The forms system is organized in three layers:

### 1. Elements (`/lib/components/forms/elements/`)

Basic wrappers around HTML form elements that ensure accessibility and consistency:

- **Input** - Wraps `<input>` element
- **Select** - Wraps `<select>` element
- **Textarea** - Wraps `<textarea>` element
- **Option** - Wraps `<option>` element

### 2. Composites (`/lib/components/forms/composites/`)

Combinations of elements that work together:

- RadioGroup - Multiple radio inputs as a single control
- CheckboxGroup - Multiple checkboxes as a set
- Other multi-element patterns

### 3. Fields (`/lib/components/forms/fields/`)

Complete, datatype-centric form components that developers use:

- Combine elements/composites with Label, Help, Error components
- Named by datatype (TextField, BooleanField, etc.)
- Provide complete field experience
- Handle validation, help text, error display

## Layer Relationships

Example of how layers work together:

**TextField** (field) →

- Uses **Input** or **Textarea** (elements)
- Adds **Label** component
- Adds **Help** component for helpText
- Adds **Error** component for validation messages
- Orchestrates validation, change handling, and accessibility

**ChooseOneField** (field) →

- Uses **RadioGroup** or **Select** (composite/element)
- RadioGroup itself uses multiple **Input** elements
- Adds Label, Help, Error components
- Manages single selection state

## Usage Guidance

### For Application Developers

- Use **Fields** exclusively in your forms - they provide the complete experience
- Elements and Composites are internal implementation details
- Fields handle all accessibility, labeling, and validation concerns

### For Library Contributors

- **Elements** wrap single HTML elements with consistent props and accessibility
- **Composites** combine multiple elements into cohesive controls
- **Fields** orchestrate elements/composites with labels, help text, and validation
