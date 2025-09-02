import * as monaco from 'monaco-editor';

import { compileJSX, formatAST } from '../../../src/compiler.ts';

// Declare MonacoEnvironment on global for worker bootstrap with correct type
declare global {
	interface Window {
		MonacoEnvironment?: monaco.Environment;
	}
	interface WorkerGlobalScope {
		MonacoEnvironment?: monaco.Environment;
	}
}

// Configure Monaco Editor workers using blob URLs to avoid cross-origin worker restrictions
const MONACO_CDN = 'https://esm.sh/monaco-editor@0.52.2';
(self as Window & { MonacoEnvironment?: monaco.Environment }).MonacoEnvironment = {
	getWorker: function (_moduleId: string, label: string) {
		const workerPath = (label === 'typescript' || label === 'javascript')
			? `${MONACO_CDN}/esm/vs/language/typescript/ts.worker`
			: `${MONACO_CDN}/esm/vs/editor/editor.worker`;
		// Use ESM module workers with a blob that imports the CDN worker entry.
		const code = `import '${workerPath}';`;
		const blob = new Blob([code], { type: 'application/javascript' });
		const url = URL.createObjectURL(blob);
		return new Worker(url, { name: `${label}-worker`, type: 'module' });
	},
};

// Configure Monaco Editor
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ES2020,
	allowNonTsExtensions: true,
	moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
	module: monaco.languages.typescript.ModuleKind.ESNext,
	noEmit: true,
	esModuleInterop: true,
	jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
	jsxImportSource: './jsx-runtime',
	allowJs: true,
	typeRoots: ['node_modules/@types'],
});

// Default JSX code
type RuleConfig =
	| { kind: 'required' }
	| { kind: 'emailFormat' }
	| { kind: 'minLength'; length: number }
	| { kind: 'maxLength'; length: number };

type ValidatorConfig =
	| { kind: 'and'; rules: RuleConfig[] }
	| { kind: 'or'; rules: RuleConfig[] };

function Required() {
	return { kind: 'required' } as const;
}
function EmailFormat() {
	return { kind: 'emailFormat' } as const;
}
function MinLength({ length }: { length: number }) {
	return { kind: 'minLength', length } as const;
}
function MaxLength({ length }: { length: number }) {
	return { kind: 'maxLength', length } as const;
}
function And({ children }: { children: RuleConfig[] }) {
	const arr = Array.isArray(children) ? children : [children];
	return { kind: 'and' as const, rules: arr };
}
function Validation({ children }: { children: ValidatorConfig }) {
	return Array.isArray(children) ? (children[0] as ValidatorConfig) : children;
}

function Equals({ left, right }: { left: unknown; right: unknown }) {
	return { kind: 'equals', left, right };
}
function Condition({ children }: { children: any }) {
	return Array.isArray(children) ? children[0] : children;
}
function IfTrue({ children }: { children: any }) {
	return {
		type: 'div',
		props: { 'data-slot': 'iftrue' },
		children: Array.isArray(children) ? children : [children],
	};
}
function IfFalse({ children }: { children: any }) {
	return {
		type: 'div',
		props: { 'data-slot': 'iffalse' },
		children: Array.isArray(children) ? children : [children],
	};
}

function EmailField(
	{ name, label = 'Email', help, required = false, children }: {
		name: string;
		label?: string;
		help?: string;
		required?: boolean;
		children?: any;
	},
) {
	const arr = Array.isArray(children) ? children : (children != null ? [children] : []);
	const validator = arr.find((c) => c && typeof c === 'object' && 'kind' in c) as
		| ValidatorConfig
		| undefined;

	return {
		type: 'div',
		props: { class: 'field' },
		children: [
			{
				type: 'label',
				props: { for: name, class: 'label' },
				children: [label + (required ? ' *' : '')],
			},
			{
				type: 'input',
				props: {
					id: name,
					name,
					type: 'email',
					class: 'input',
					required,
					'data-validate': validator,
				},
				children: [],
			},
			{ type: 'div', props: { class: 'help', 'aria-live': 'polite' }, children: [help ?? ''] },
		],
	};
}

function ConditionalDisplay({ children }: { children: any }) {
	const arr = Array.isArray(children) ? children : (children != null ? [children] : []);
	const condition = arr.find((c) => c && typeof c === 'object' && 'kind' in c) as any | undefined;
	const rest = arr.filter((c) => !(c && typeof c === 'object' && 'kind' in c));
	return {
		type: 'div',
		props: { class: 'conditional', 'data-display': condition },
		children: rest,
	};
}

const element = {
	type: 'form',
	props: { class: 'form' },
	children: [
		EmailField({
			name: 'email',
			label: 'Email',
			help: 'We’ll never share your email.',
			required: true,
			children: [
				Validation({
					children: And({
						children: [
							Required(),
							EmailFormat(),
							MinLength({ length: 6 }),
							MaxLength({ length: 100 }),
						],
					}) as ValidatorConfig,
				}),
			],
		}),
		ConditionalDisplay({
			children: [
				Condition({ children: Equals({ left: 1, right: 1 }) }),
				IfTrue({
					children: {
						type: 'div',
						props: {},
						children: ['This will be displayed if the condition is true.'],
					},
				}),
				IfFalse({
					children: {
						type: 'div',
						props: {},
						children: ['This will be displayed if the condition is false.'],
					},
				}),
			],
		}),
	],
};

// Create the UI
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app">
    <header class="header">
      <h1>JSX to AST Visualizer</h1>
      <p>Experiment with JSX transformation using custom createElement and Fragment functions</p>
    </header>

    <div class="panels">
      <div class="panel">
        <h2>JSX Input</h2>
        <div id="editor" class="editor"></div>
      </div>

      <div class="panel">
        <h2>Compiled JavaScript</h2>
        <pre id="compiled-output" class="output"></pre>
      </div>

      <div class="panel">
        <h2>AST Output</h2>
        <pre id="ast-output" class="output"></pre>
      </div>
    </div>

    <div class="errors" id="errors" style="display: none;">
      <h3>Compilation Errors:</h3>
      <ul id="error-list"></ul>
    </div>
  </div>
`;

// Create Monaco editor
const editor = monaco.editor.create(document.getElementById('editor')!, {
	value: '',
	language: 'typescript',
	theme: 'vs-dark',
	automaticLayout: true,
	minimap: { enabled: false },
	fontSize: 14,
	wordWrap: 'on',
	scrollBeyondLastLine: false,
});

// Wire compilation using compiler.ts from src/
function updateOutputs() {
	const code = editor.getValue();
	const result = compileJSX(code);
	const compiledOutput = document.getElementById('compiled-output')!;
	const astOutput = document.getElementById('ast-output')!;
	const errorsDiv = document.getElementById('errors')!;
	const errorList = document.getElementById('error-list')!;

	compiledOutput.textContent = result.compiledCode || 'No output';
	if (result.ast) {
		astOutput.textContent = formatAST(result.ast);
	} else {
		astOutput.textContent = 'No AST generated';
	}

	if (result.errors.length > 0) {
		errorList.innerHTML = result.errors.map((error) => `<li>${error}</li>`).join('');
		errorsDiv.setAttribute('style', 'display: block;');
	} else {
		errorsDiv.setAttribute('style', 'display: none;');
	}
}

editor.onDidChangeModelContent(() => updateOutputs());
updateOutputs();
