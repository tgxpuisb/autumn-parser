#!/bin/sh
rsync -aq  --exclude-from="./.rsync-exclude.list" ~/github_project/electron-app/ ~/workspace/gitlab_in_husor/yuerbao_admin_app/