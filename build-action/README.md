# build-action

Assemble a deployable graph-browser site from a `data/` directory by downloading a pinned release bundle.

## Usage

```yaml
- uses: lambdasistemi/graph-browser/build-action@v0.4.1
  with:
    version: v0.4.1   # REQUIRED — pin both the action ref and the version
    data-dir: data    # default: data
    output-dir: site  # default: site
```

| Input | Required | Description |
|---|---|---|
| `version` | yes | graph-browser release tag whose `lib-bundle.tar.gz` to install (e.g. `v0.4.1`). |
| `data-dir` | no, default `data` | Path to the data directory in your repository. |
| `output-dir` | no, default `site` | Path to write the assembled site. |

## What it does

1. Downloads `lib-bundle.tar.gz` from `github.com/lambdasistemi/graph-browser/releases/download/<version>/` and extracts `index.html` + `index.js` into `output-dir`.
2. Copies `data-dir` into `output-dir/data`.
3. Generates `output-dir/data/views/index.json` if `data/views/` exists and the index is missing.

The output is ready to upload to GitHub Pages or any static host.

## Why pin

The bundle is your runtime. Pinning the `version:` input (and the action ref) means your deployed site never changes unless you bump the pin — graph-browser PRs and Pages republishes can never silently break or alter your data repo's UI.

## Migration from `@main`

If you previously used:

```yaml
- uses: lambdasistemi/graph-browser/build-action@main
```

…replace it with the pinned form above. Pick a release from <https://github.com/lambdasistemi/graph-browser/releases>.
