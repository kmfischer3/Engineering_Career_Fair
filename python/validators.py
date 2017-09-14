import re
import rigidity


class FixDescription(rigidity.rules.Rule):
    def apply(self, value):
        value = value.replace('''_x000D_
_x000D_''', '\n')
        value = value.replace('_x000D_', '')
        return value


class ValidatePositions(rigidity.rules.Rule):
    valid_characters = ['i', 'c', 'e', 'x']

    def apply(self, value):
        if not isinstance(value, str):
            raise TypeError('`value` must be a string')
        for c in value:
            if c not in self.valid_characters:
                raise ValueError('Invalid position character: \'%s\'' % c)
        return value


class UrlValidator(rigidity.rules.Rule):
    def apply(self, value):
        if value is None or value == '':
            return None

        value = value.strip()

        if not (value.startswith('http://') or value.startswith('https://')):
            raise ValueError('URL does not start with http:// or https://')
        if (value.find('http:', 1) != -1) or (value.find('https:', 1) != -1):
            raise ValueError('URL contains an extra http: or https:')

        # Check for a TLD, using a short, but validated list of known TLDs
        if not re.search('\.(com|org|net|edu|jobs|us|gov|mil|co)', value):
            raise ValueError('URL did not have a recognized TLD')

        return value
