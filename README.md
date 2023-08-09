# Conventional-Logs

This package is a CLI utility tool for generating a CHANGELOG using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification as a basis. By writing clean commits, it allows smaller projects to document changes between versions and update the Semantic Version accordingly.

## Installing Conventional-Logs

This [package](https://www.npmjs.com/package/conventional-logs) can be installed locally to `devDependencies`:

```bash
npm i -D conventional-logs
```

The package can be executed through an `package.json` script, or directly in the terminal:

```json
"scripts": {
    "updateChangelog": "npx cologs"
}
```

## How it Works

1. A user `merge --squash` a development branch into the main branch, followed by a commit that matches Conventional Commit specifications
2. Assuming the main branch is ready to be released, the user runs `cologs` to parse main branch commits to then add to the CHANGELOG.md
3. `cologs` will automatically bump the `package.json` version appropriately and commit the changes to CHANGELOG.md
4. The CHANGELOG.md commit will be given a git tag of `v<version_number>` for easy reference

## Initializing CHANGELOG.md and First Release

This will create the CHANGELOG.md file for the first release of the project. Conventional-Logs will use the `package.json` version declared by the user as the intial release.

``` bash
npm cologs --first-release
```

