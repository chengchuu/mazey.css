#!/usr/bin/env bash

set -euo pipefail

NODE14_VERSION="${NODE14_VERSION:-14.21.3}"
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm was not found at $NVM_DIR/nvm.sh" >&2
  echo "Install nvm first, or export NVM_DIR before running this script." >&2
  exit 1
fi

ensure_rosetta() {
  if ! arch -x86_64 /usr/bin/true >/dev/null 2>&1; then
    cat >&2 <<'EOF'
Rosetta 2 does not appear to be available.
Install it with:

  softwareupdate --install-rosetta --agree-to-license
EOF
    exit 1
  fi
}

run_under_node14() {
  local script_dir repo_root
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  repo_root="$(cd "$script_dir/.." && pwd)"

  source "$NVM_DIR/nvm.sh"

  if ! nvm ls "$NODE14_VERSION" >/dev/null 2>&1; then
    echo "Node $NODE14_VERSION is not installed in nvm yet." >&2
    echo "From a Rosetta x86_64 shell, run:" >&2
    echo "  nvm install $NODE14_VERSION --shared-zlib" >&2
    exit 1
  fi

  nvm use "$NODE14_VERSION" >/dev/null
  cd "$repo_root"

  if [[ $# -gt 0 ]]; then
    exec "$@"
  fi

  echo "Node $(node -v) active in $repo_root"
  echo "Architecture: $(node -p 'process.arch')"
  echo "Type 'exit' when you're done with the legacy shell."
  exec "${SHELL:-/bin/zsh}" -i
}

ensure_rosetta

if [[ "$(uname -m)" == "arm64" ]]; then
  exec arch -x86_64 /bin/bash "$0" "$@"
fi

run_under_node14 "$@"
