__author__ = 'Bernhard Biskup'
__email__ = 'bbiskup@gmx.de'
__version__ = '0.1.9'


# Additional MIME types for Flask
import mimetypes

mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('application/x-font-woff', '.ttf')
