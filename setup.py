from setuptools import setup


def parse_requirements():
    with open('requirements.txt') as req:
        return req.readlines()

setup(name='purkinje',
      version='0.0.1',
      description='Test runner for py.test with web GUI',
      author='Bernhard Biskup',
      author_email='bbiskup@gmx.de',
      url='biskup-software.de',
      package_dir={'': 'src'},
      packages=['purkinje'],
      zip_safe=False,
      include_package_data=True,
      install_requires=parse_requirements(),
      entry_points={
          'console_scripts': [
              'purkinje = purkinje.purkinje:main'
          ]
      }
      )
