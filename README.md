# Img Terminal Paste

Make `Cmd+V` work seamlessly for **both text and images** in the VS Code integrated terminal on macOS.

## Why

On macOS, VS Code intercepts `Cmd+V` in the integrated terminal (`workbench.action.terminal.paste`) and only handles plain text. Terminal-based AI agents and TUIs that natively read clipboard images on `Ctrl+V` (such as **Pi** or **Claude Code**) never receive the shortcut when you press `Cmd+V`.

Unlike extensions that save clipboard images into your project folder and insert file paths, **Img Terminal Paste** simply forwards `Ctrl+V` when an image is in your clipboard—keeping your workspace clean and letting your terminal app handle the image natively.

## How It Works

When you press `Cmd+V` inside the VS Code integrated terminal (`terminalFocus && !terminalFindFocused`):

1. **Text in clipboard:** Runs the standard `workbench.action.terminal.paste` command.
2. **No text, image in clipboard:** Checks the macOS clipboard via `osascript -e 'clipboard info'` for image data (`PNGf`, `TIFF`, `JPEG`, `GIFf`) and forwards `Ctrl+V` (`\x16`) to the active terminal.
3. **Anything else:** Falls back to `workbench.action.terminal.paste`.

No files are written to your repository, and no `.gitignore` changes are needed.

## Requirements

- **macOS**
- **VS Code** `>= 1.80.0`
- A terminal application / TUI that handles `Ctrl+V` for clipboard image paste

## Installation

### From source (local symlink)

```bash
git clone https://github.com/<your-username>/vscode-img-terminal-paste.git
ln -s "$(pwd)/vscode-img-terminal-paste" ~/.vscode/extensions/local.img-terminal-paste-0.1.0
```

Then reload VS Code (`Cmd+Shift+P` → `Developer: Reload Window`).

### From `.vsix` package

```bash
npx @vscode/vsce package
code --install-extension img-terminal-paste-0.1.0.vsix
```

## License

[MIT](LICENSE)
