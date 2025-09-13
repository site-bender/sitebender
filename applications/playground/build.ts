// Simple build script for Deno
export {};

const distDir = './dist';

// Ensure dist directory exists
try {
	await Deno.mkdir(distDir, { recursive: true });
} catch {
	// Directory might already exist
}

// Copy HTML file
await Deno.copyFile('./index.html', `${distDir}/index.html`);

// Copy CSS file
await Deno.copyFile('./src/style.css', `${distDir}/style.css`);

// Copy TypeScript files (they'll be handled by Deno at runtime)
const srcFiles = [
	'src/main.ts',
	'src/compiler.ts',
	'src/jsx-runtime/index.ts',
];

const copyTasks = srcFiles.map(async (file) => {
	const destFile = `${distDir}/${file}`;
	const destDir = destFile.substring(0, destFile.lastIndexOf('/'));

	try {
		await Deno.mkdir(destDir, { recursive: true });
	} catch {
		// Directory might already exist
	}

	await Deno.copyFile(file, destFile);
});

await Promise.all(copyTasks);

console.log('✅ Build completed successfully!');
console.log('📦 Output directory: ./dist');
console.log('🚀 Run with: deno run --allow-net --allow-read dist/server.ts');
