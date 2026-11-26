# Contributing

## Development & Local Testing

1. Symlink the repo into your VS Code extensions folder:
   ```bash
   ln -s "$(pwd)" ~/.vscode/extensions/local.img-terminal-paste-0.1.0
   ```
2. Reload VS Code (`Cmd+Shift+P` → `Developer: Reload Window`) after making changes.
3. Validate syntax and packaging before committing:
   ```bash
   node -c extension.js
   npm run package
   ```

## Branching & Commits

- Never push directly to `main`. Open a PR from a branch:
  - `feat/<scope>` — new functionality
  - `fix/<scope>` — bug fixes
  - `docs/<scope>` — documentation only
  - `chore/<scope>` — tooling, CI, or release bumps
- Keep commits atomic using imperative lowercase messages (`<type>(<scope>): <desc>` or `<type>: <desc>`).

## Versioning & Releases

`package.json` (`version`) is the single source of truth. Follow SemVer:

- `patch` (`0.1.x`): bug fixes or minor compatibility adjustments.
- `minor` (`0.x.0`): backward-compatible features or configuration options.
- `major` (`1.0.0`, `2.0.0`): first stable release or breaking changes (e.g., default keybinding or minimum VS Code version).
- No bump: changes affecting only `README.md`, docs, or `.github/`.

### Release Flow

1. On the PR branch (as the final commit before merging, **without** creating a git tag):
   ```bash
   npm version <patch|minor|major> --no-git-tag-version
   git add package.json
   git commit -m "chore(release): bump to vX.Y.Z"
   ```
2. After merging the PR into `main`, tag and push from `main`:
   ```bash
   git checkout main && git pull
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
3. Pushing a `v*` tag triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which builds the `.vsix` and publishes a GitHub Release automatically.
