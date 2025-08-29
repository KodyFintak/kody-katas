#!/bin/bash

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

install_nvm() {
 echo "checking for nvm"

 if command_exists nvm; then
   echo "nvm already installed"
 else
   echo "installing nvm via homebrew"

   brew install nvm
 fi
}

install_node() {
  echo "checking for node"

  if command_exists npm; then
    echo "node already installed"
  else
    echo "installing node via nvm"

    install_nvm

    nvm install 20

    echo "node installed"
  fi
}

npm_install() {
  echo "running npm install on repo"

  npm i

  echo "npm install complete"
}

install_mob() {
  ../scripts/install_mob.sh
}

install_mob
install_node
npm_install

echo "done!"