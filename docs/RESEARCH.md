# git-standup — research record

## Revision and scope

- Repository: [NickCirv/git-standup](https://github.com/NickCirv/git-standup)
- Commit: `9be524a5d63160c555cd8acbb27acd050c00307d`
- Tree: `abed3c60e59a2a6f7cb6308baed1caba0fab5915`
- Captured: 6 of 6 eligible text files (all eligible text files).
- Recursive tree truncated: `False`.
- Runtime verification: **unverified**; no repository code, installation or test command was executed.

The captured file inventory is broader than the semantic review. Authoring inspected package metadata, entrypoint/argument handling and implementation paths relevant to the claims below, plus test declarations. This is documentation research, not a line-by-line security audit. Generated/binary artifacts, lockfiles and file types outside the acquisition filter were not inspected.

## Claim and evidence

| Claim | Pinned evidence | Status |
| --- | --- | --- |
| Runtime requirement and executable mapping | [package.json](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/package.json) | verified in manifest; installation unverified |
| Collect recent commits across local repositories for a standup draft. | [implementation](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/index.js) | partially verified by static implementation review |
| Operational limits and side effects | [implementation](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/index.js) and source map in [reference](REFERENCE.md) | partially verified; runtime unverified |
| Test command definition | [package.json](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/package.json) | verified as a declaration only |

## Findings carried into the rewrite

The default author lookup uses global Git user.email, which can differ from repository-specific identity. A standup assembled from commits omits discussions, review and uncommitted work. Markdown output is printed, not sent to Slack.

No runtime checks were executed for this documentation review. The committed smoke test checks entrypoint JavaScript syntax; it does not exercise the command behavior.

## Documentation inventory and disposition

| Existing document | Disposition |
| --- | --- |
| [README.md](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/README.md) | Rewritten overview; historical copy remains at this pinned URL. |

New supporting documents: `docs/REFERENCE.md` and `docs/RESEARCH.md`. No original source or protected legal/security file was changed.

## Protected-file evidence

- `LICENSE` SHA-256 `68729cab364d82364078b08d8580ccfa51dc69c81a7d64e8d8d47a1da6c9349d`.

## Remaining verification

Clean installation, useful-command execution, malformed input, side-effect boundaries, platform compatibility and end-to-end tests remain unverified. Package-registry availability and live API destinations were not checked. No performance, customer-adoption, compliance or production-readiness claim is made.

## Captured evidence index

- [LICENSE](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/LICENSE) · blob `05b804beeec7d1a6c933d087387ba4adf6463d93`.
- [README.md](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/README.md) · blob `b7abc476c62f1d60b6adf9d6d7617897891677b6`.
- [package.json](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/package.json) · blob `af1d69645c00ca7baf7213aae2d718bc9ba94c72`.
- [.github/workflows/ci.yml](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/.github/workflows/ci.yml) · blob `44515034a394670de44454a7a1bd2c7ef0c9836e`.
- [index.js](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/index.js) · blob `d70b8c9184f67aac47463cd241fba314edd53ef6`.
- [test/smoke.test.js](https://github.com/NickCirv/git-standup/blob/9be524a5d63160c555cd8acbb27acd050c00307d/test/smoke.test.js) · blob `ebbccaaf2583b4850575f835313e4b0afd21bff7`.

## Tree files outside the captured text set

These paths were mapped but their contents were not acquired in this research pass:

- `banner.svg`
