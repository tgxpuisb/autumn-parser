#!/bin/sh
rsync -aq  --exclude-from="./.rsync-exclude.list" ~/workspace/gitlab_in_husor/autumn-parser/ ~/github_project/autumn-parser