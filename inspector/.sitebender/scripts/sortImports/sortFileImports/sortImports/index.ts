import type { ImportInfo } from '../../index.ts';

export default function sortImports(imports: ImportInfo[]): string {
	if (imports.length === 0) return '';

	// Sort all imports by category first, then by type within category, then alphabetically
	const sortedImports = [...imports].sort((a, b) => {
		// First sort by category
		const categoryOrder = [
			'external',
			'types',
			'components',
			'utilities',
			'constants',
			'local',
		];
		const categoryDiff = categoryOrder.indexOf(a.category) -
			categoryOrder.indexOf(b.category);
		if (categoryDiff !== 0) return categoryDiff;

		// Within same category, sort by type (type imports before value imports)
		if (a.type !== b.type) {
			return a.type === 'type' ? -1 : 1;
		}

		// Within same category and type, sort by source
		if (a.source !== b.source) {
			return a.source.localeCompare(b.source);
		}

		// Special sorting for imports from same source
		// Put default imports before named imports
		const aIsDefault = a.text.includes(' from ') && !a.text.includes('{');
		const bIsDefault = b.text.includes(' from ') && !b.text.includes('{');

		if (aIsDefault && !bIsDefault) return -1;
		if (!aIsDefault && bIsDefault) return 1;

		return a.text.localeCompare(b.text);
	});

	// Group by category and type combination for spacing
	const groups: Array<{
		category: string;
		type: string;
		imports: ImportInfo[];
	}> = [];
	let currentGroup: {
		category: string;
		type: string;
		imports: ImportInfo[];
	} | null = null;

	sortedImports.forEach((imp: any) => {
		if (
			!currentGroup ||
			currentGroup.category !== imp.category ||
			currentGroup.type !== imp.type
		) {
			currentGroup = { category: imp.category, type: imp.type, imports: [] };
			groups.push(currentGroup);
		}
		currentGroup.imports.push(imp);
	});

	// Build output with proper spacing between groups
	const output: string[] = [];
	groups.forEach((group, index: any) => {
		if (index > 0) {
			output.push(''); // blank line between groups
		}
		group.imports.forEach((imp: any) => output.push(imp.text));
	});

	return output.join('\n');
}
