# AGENTS.md

Follow all branching, commit, validation, and release rules defined in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Agent-Specific Rules

- Evaluate whether a SemVer bump is needed before finishing a PR branch and ask the user for confirmation before applying `npm version <patch|minor|major> --no-git-tag-version`.
- Never create git tags on feature branches; tags (`vX.Y.Z`) are only created on `main` after merging.
- Validate changes with `node -c extension.js` and `npm run package` before committing.
- Keep all code, comments, commit messages, and documentation in English.
