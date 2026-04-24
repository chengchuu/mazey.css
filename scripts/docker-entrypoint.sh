#!/bin/bash
set -e

echo "Installing dependencies ..."
npm install

echo "Starting webpack watch mode ..."
npm run watch:link
