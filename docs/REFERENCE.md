# git-standup — command reference

[Overview](../README.md) · [Research record](RESEARCH.md)

Describes revision `9be524a5d63160c555cd8acbb27acd050c00307d`. Commands are source-inspected; no execution results are asserted.

## Workflow

Recursively discovers repositories, filters date and author, and prints text, Markdown or JSON. Merge commits are omitted unless --merges is passed.

Requires Git and a local repository with the relevant history. Commands are source-inspected, not executed in this review.

```bash
node index.js --path ../your-project --since "2 days ago" --all --format markdown
```

## Commands and controls

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

## Interpretation and side effects

The default author lookup uses global Git user.email, which can differ from repository-specific identity. A standup assembled from commits omits discussions, review and uncommitted work. Markdown output is printed, not sent to Slack.

## Implementation reference

- [package.json](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/package.json)
- [index.js](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/index.js)
- [test/smoke.test.js](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/test/smoke.test.js)
