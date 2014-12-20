#!/bin/sh

# Bump project version information

VERSION=$1

sed -i -e"s/ version='.*',/ version='"$VERSION"',/g" setup.py
sed -i -e"s/version = '.*',/ version='"$VERSION"',/g" docs/conf.py
sed -i -e's/ "version": ".*",/ "version": "'$VERSION'",/g' package.json
sed -i -e"s/__version__ = '.*'/__version__ = '"$VERSION"'/g" purkinje/__init__.py
