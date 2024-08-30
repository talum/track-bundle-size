# Bundle size tracker

Accepts entry file names and an issue number. Finds the relevant chunks from a manifest file and approximates the bundle sizes. Outputs the results in an issue comment.

## Initial Setup

1. Install the dependencies
`npm install`

2. Build the main file
`npm run build`

3. Run the tests
`npm test`

## Local development

To tweak something locally and test it out, you'll need a GitHub token.

Example:

```
GITHUB_TOKEN=<your token> INPUT_TRACKING_ISSUE_NUMBER=<your issue number> INPUT_ENTRY_FILE_NAMES=<comma-separated list of entry files to track> node dist/index.js
```
