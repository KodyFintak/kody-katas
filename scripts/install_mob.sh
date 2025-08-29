#!/bin/bash

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

install_mob() {
  echo "checking for mob.sh"

  if command_exists mob; then
    echo "mob.sh already installed"
  else
    echo "installing mob.sh via homebrew"

    brew install remotemobprogramming/brew/mob

    echo "mob.sh installed"
  fi
}

install_mob
