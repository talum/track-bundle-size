# Bundle size tracker

Accepts entry file names and an issue number. Finds the relevant chunks from a manifest file and approximates the bundle sizes. Outputs the results in an issue comment. Useful for directional tracking of bundle sizes.

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

## Installing the action in a repo

Create a workflow file

```
# .github/workflows/track.yml

name: "Track bundle size"

# Set one or more options for triggering workflow runs. Some common examples included below.
on:
  # Allows you to run this workflow manually from the Actions tab 
  workflow_dispatch:

  # Schedules workflow runs. See https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule for syntax.
  schedule:
    # Every Tuesday at 5 AM UTC (12 AM ET)
    - cron: "0 7 * * 2"

jobs:
  track_bundle_size:
    name: "Track bundle size"
    runs-on: ubuntu-latest
    steps:
      - name: Run track bundle size
        uses: talum/track-bundle-size@<your-version-here>
        with:
          tracking_issue_number: 1
          entry_file_names: "test.js,test-2.js"
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```
