import { main } from "./main";

import * as core from "@actions/core";

const entryFileNames = core.getInput("entry_file_names").split(",");

main({
  files: entryFileNames,
});
