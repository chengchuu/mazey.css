#!/bin/bash
set -e

echo "Installing dependencies ..."
npm install

echo "Starting webpack watch mode for all configurations ..."
npm run watch:all
