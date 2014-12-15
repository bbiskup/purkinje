import os
import stat
import errno


def ensure_dir(path):
    """Make sure the specified directory exists
       and is writable
    """
    try:
        os.mkdir(path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise

    if os.stat(path).st_mode & stat.S_IRWXU != stat.S_IRWXU:
        raise IOError(errno.EPERM,
                      'Insufficient directory permissions',
                      path)
