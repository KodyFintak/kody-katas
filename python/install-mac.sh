#!/bin/bash

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

install_mac_python_dependencies() {
  xcode-select --install
  brew install openssl readline sqlite3 xz tcl-tk@8 libb2 zstd zlib pkgconfig

}

install_pyenv() {
  if ! command_exists pyenv; then
    echo 'installing pyenv'
    brew install pyenv
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
    echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
    echo 'eval "$(pyenv init - zsh)"' >> ~/.zshrc
    install_mac_python_dependencies
  fi
}

install_python() {
  pyenv install 3.14
  pyenv global 3.14
}

install_pyenv
install_python
./install.sh