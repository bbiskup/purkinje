import sys
from setuptools import setup
from setuptools.command.test import test as cmd_test

readme = open('README.rst').read()
changes = open('CHANGES.rst').read()


def parse_requirements():
    with open('requirements.txt') as req:
        return req.readlines()


class Tox(cmd_test):

    def finalize_options(self):
        cmd_test.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        # import here, cause outside the eggs aren't loaded
        import tox
        errcode = tox.cmdline(self.test_args)
        sys.exit(errcode)

setup(name='purkinje',
      version='0.1.9',
      description='Test runner for py.test with web GUI',
      long_description=readme + '\n\n' + changes,
      author='Bernhard Biskup',
      author_email='bbiskup@gmx.de',
      url='https://github.com/bbiskup/purkinje',
      package_dir={'purkinje': 'purkinje'},
      packages=['purkinje'],
      zip_safe=False,
      include_package_data=True,
      install_requires=parse_requirements(),
      entry_points={
          'console_scripts': [
              'purkinje = purkinje.purkinje:main'
          ]
      },
      classifiers=[
          'Development Status :: 2 - Pre-Alpha',
          'Environment :: Console',
          'Environment :: Web Environment',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: MIT License',
          'Programming Language :: Python :: 2.7',
          'Topic :: Software Development :: Testing'
      ],
      license='The MIT License (MIT)',
      keywords='purkinje pytest testrunner websockets',
      tests_require=['tox'],
      cmdclass={'test': Tox}
      )
