//++ Private helper for validateContract function
//++ Validates JSON schema compliance

//++ Validate schema compliance
export default function schemaValidator(schema: unknown) {
	return function (data: unknown) {
		return function () {
			// TODO: Implement JSON schema validation
			return true
		}
	}
}
