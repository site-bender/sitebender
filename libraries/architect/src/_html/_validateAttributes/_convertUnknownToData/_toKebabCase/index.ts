/*++
 + Converts string to kebab-case
 + Simple implementation for attribute name conversion
 + Private helper for _convertUnknownToData
 */
export default function _toKebabCase(str: string): string {
	/*++
	 + [EXCEPTION] Using replace method for simple string transformation
	 + This is internal utility code where performance and simplicity matter
	 */
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase()
}
