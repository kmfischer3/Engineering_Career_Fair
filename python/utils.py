import bleach
import markdown


def truncate_description(description):
    '''
    Take in a long description and cut it to a constant character
    limit, adding elipsis at the end.
    '''
    if len(description) > 140:
        description = description[0:140].strip(' \t\r\n.,')
        description = '%s...' % description
    return description


def format_description(description):
    '''
    Take in a long description, convert Markdown to HTML, and then run
    bleach on the output to ensure only safe HTML is output.
    '''
    return bleach.clean(markdown.markdown(description),
                        tags=bleach.ALLOWED_TAGS + ['p'])


def extract_citizenship_tuple(citizenship):
    '''
    Take in a semi-free-form string indicating accepted citizenship
    statuses and return a tuple of bools indicating which types are
    accepted, in the format (us, pr, vh).
    '''
    us = True if 'us' in citizenship else False
    pr = True if 'pr' in citizenship else False
    vh = True if 'vh' in citizenship else False
    return (us, pr, vh)


def extract_position_tuple(positions):
    '''
    Take in a semi-free-form string indicating the available position
    types and return a tuple of bools indicating which types are
    available, in the format (i, c, e, x).
    '''
    i = True if 'i' in positions else False
    c = True if 'c' in positions else False
    e = True if 'e' in positions else False
    x = True if 'x' in positions else False
    return (i, c, e, x)


def extract_tables(tables):
    '''
    Take in a comma-separated list of table IDs. Return a list of
    integer table IDs.
    '''
    return [int(x.strip()) for x in tables.split(',')]
