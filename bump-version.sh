#!/bin/sh

# Bump project version information

VERSION=$1

sed -i -e"s/ version='..*',/ version='"$VERSION"""',/g" setup.py
sed -i -e's/ "version": "..*",/ "version": "'$VERSION'",/g' package.json