# WARNING: This is a customized version of bitpack.py and should not be removed
# from this directory until the dependency on this extra functionality is no
# longer needed or the functionality exists upstream.
# This file adds:
#   BitPack.set_bit()
#   BitPack.set_byte()
import base64


class BitPack():

    def __init__(self, data='', b64=True):
        if isinstance(data, bytes):
            self.data = data
        else:
            self.data = data.encode('raw_unicode_escape')

        if b64:
            self.data = base64.b64decode(self.data)

    def base64(self):
        return base64.b64encode(self.data)

    def byte_at(self, index):
        return self.data[index]

    def bit_at(self, index, bit_index=None):
        if bit_index is None:
            bit_index = index % 8
            index = index // 8

        if self.byte_at(index) & (0x80 >> bit_index):
            return True

        return False

    def __len__(self):
        return len(self.data)

    def bit_or(self, pack, index=0):
        # if this reads past the end of our data, raise an index error
        if len(pack) > index + len(self):
            raise IndexError('Cannot or beyond end of pack')

        result = bytes()
        for i in range(0, len(pack)):
            result += bytes(chr(self.byte_at(index + i) | pack.byte_at(i)),
                            'raw_unicode_escape')

        return BitPack(result, b64=False)

    def __or__(self, pack):
        return self.bit_or(pack)

    def bool_or(self, pack, index=0):
        # oring with an empty pack should always return true
        if len(pack) == 0:
            return True

        # if this check reads past the end of our data, return false
        if index + len(pack) > len(self):
            return False

        for i in range(0, len(pack)):
            if self.byte_at(index + i) | pack.byte_at(i):
                return True

        return False

    def bit_and(self, pack, index=0):
        # if this reads past the end of our data, raise an index error
        if len(pack) > index + len(self):
            raise IndexError('Cannot or beyond end of pack')

        result = bytes()
        for i in range(0, len(pack)):
            result += bytes(chr(self.byte_at(index + i) & pack.byte_at(i)),
                            'raw_unicode_escape')

        return BitPack(result, b64=False)

    def __and__(self, pack):
        return self.bit_and(pack)

    def bool_and(self, pack, index=0):
        # anding with an empty pack should always return true
        if len(pack) == 0:
            return True

        # if this reads past the end of our data, raise an index error
        if index + len(pack) > len(self):
            raise IndexError('Cannot or beyond end of pack')

        for i in range(0, len(pack)):
            if self.byte_at(index + i) & pack.byte_at(i):
                return True

    def __getitem__(self, index):
        return BitPack(self.data[index], b64=False)

    def set_bit(self, value, index, bit_index=None):
        if bit_index is None:
            bit_index = index % 8
            index = index // 8

        byte = self.byte_at(index)

        if value:
            byte |= 0x80 >> bit_index
        elif byte & (0x80 >> bit_index):
            byte ^= 0x80 >> bit_index

        self.set_byte(index, byte)

    def set_byte(self, index, value):
        if index >= len(self) or index < 0:
            raise IndexError('Cannot index outside of pack bounds')

        self.data = self.data[0:index] + bytes([value]) + self.data[index+1:]
