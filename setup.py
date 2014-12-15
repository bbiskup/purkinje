from setuptools import setup


def parse_requirements():
    with open('requirements.txt') as req:
        return req.readlines()

setup(name='purkinje',
      version='0.1.0',
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
      },
      classifiers={
          'Development Status :: 2 - Pre-Alpha',
          'Environment :: Console',
          'Environment :: Web Environment',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: MIT License',
          'Programming Language :: Python :: 2.7',
      },
      license='The MIT License (MIT)',
      keywords='pytest testrunner websockets'
      )
