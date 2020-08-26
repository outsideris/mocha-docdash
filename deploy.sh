#!/usr/bin/env bash

# This script clones the `mochajs.org` branch of
# https://github.com/mochajs/mocha--which is the branch that the site at
# https://mochajs.org is built from--into a `mocha` subdirectory.  It then
# installs the current version of `@mocha/docdash` over whatever is currently
# used in the `mochajs.org` branch, and builds Mocha's documentation using it.
# This way, we can see the proposed changes to this theme as they would affect
# the site. 

set -o errexit
set -o nounset
set -o pipefail

git clone --branch 'mochajs.org' https://github.com/mochajs/mocha.git
cd mocha
npm ci
npm install ..
npm start docs
