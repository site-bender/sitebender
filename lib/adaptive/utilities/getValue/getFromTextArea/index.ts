const getFromTextArea = (
	textarea: HTMLTextAreaElement | null | undefined,
): string => textarea?.value ?? ""

export default getFromTextArea
