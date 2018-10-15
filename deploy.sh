#!/usr/bin/env bash
yarn run build && \
git fetch origin && \
git checkout origin/gh-pages && \
mv build/* ./ && \
git add . && \
git commit -m 'new build' && \
git push origin HEAD:gh-pages && \
git checkout -
