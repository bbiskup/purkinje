#!/usr/bin/env python

from flask import Flask

app = Flask(__name__)


@app.route('/')
def main():
    return "Purkinje"

if __name__ == '__main__':
    print('purkinje ready')
    app.run()