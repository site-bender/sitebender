// Template formats for different creative works
export const FORMATS = {
	movie: {
		titleOnly: "{{title}}",
		titleYear: "{{title}} ({{year}})",
		titleDirector: "{{title}} directed by {{director}}",
		full: "{{title}} ({{year}}) directed by {{director}}",
	},
	// Add other formats as needed
} as const
