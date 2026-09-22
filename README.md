![git-standup — Nicholas Ashkar repository collection](assets/nicholas-ashkar/banner.png)

# git-standup

Collect recent commits across local repositories for a standup draft.


<a id="usage"></a>

## What it does

Recursively discovers repositories, filters date and author, and prints text, Markdown or JSON. Merge commits are omitted unless --merges is passed. See the pinned [implementation](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/index.js).


<a id="install"></a>

## Quickstart

Node requirement from the inspected manifest: **`>=20`**. Requires Git and a local repository with the relevant history. Commands are source-inspected, not executed in this review.

The following example is **source-inspected, not executed**. It uses a pinned checkout; npm package publication is not assumed. Replace project paths or provide the stated input fixtures before running it.

```bash
git clone https://github.com/NickCirv/git-standup.git
cd git-standup
git checkout 9be524a5d63160c555cd8acbb27acd050c00307d
npm install --ignore-scripts
node index.js --path ../your-project --since "2 days ago" --all --format markdown
```

Dependencies are installed with lifecycle scripts disabled in this recipe. Read the package scripts before enabling any lifecycle step required by your environment.

## Usage and reference

`git-standup` | `standup` are the executable names declared by the package. [Command reference](docs/REFERENCE.md) covers source-backed options and entry points.

| Option | Purpose | Default |
| --- | --- | --- |
| `--since`, `-s DATE` | Start of Git history range | `yesterday` |
| `--until`, `-u DATE` | End of history range | `now` |
| `--author`, `-a TEXT` | Git author filter | Global Git `user.email` |
| `--path`, `-p PATH` | Repository discovery root | Current directory |
| `--depth`, `-d N` | Discovery recursion depth | `2` |
| `--format`, `-f FORMAT` | `text`, `markdown`, or `json` | `text` |
| `--all` | Include all authors | Off |
| `--merges` | Include merge commits | Off |

## Limits and operational notes

The default author lookup uses global Git user.email, which can differ from repository-specific identity. A standup assembled from commits omits discussions, review and uncommitted work. Markdown output is printed, not sent to Slack.

## Development

No runtime checks were executed for this documentation review. The committed smoke test checks entrypoint JavaScript syntax; it does not exercise the command behavior.

| Script | Declared command |
| --- | --- |
| `test` | `node --test` |

Work from the pinned source, keep changes focused, and reproduce the affected behavior with a small fixture before proposing a change. Existing contribution and security policies remain authoritative where present.

## Research and status

[Research record](docs/RESEARCH.md) identifies the inspected revision, source evidence, documentation disposition and verification gaps. Static inspection supports the descriptions here; runtime behavior, dependency installation and current hosted services remain unverified.

## License and author

[License](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/LICENSE)

[Nicholas Ashkar](https://nicholashkar.com) · Applied AI, systems and consulting.
