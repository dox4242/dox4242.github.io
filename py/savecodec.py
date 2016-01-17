# a codec for exported saves from Realm Grinder [http://www.kongregate.com/games/divinegames/realm-grinder]
# by Divine Games [www.divinegames.it]

import zlib, base64, json

# get an object from an exported save
decode = lambda x: json.loads(zlib.decompress(base64.b64decode(x[2:-2])))

# get an exported save from an object
encode = lambda x: '$s' + base64.b64encode(zlib.compress(bytes(json.dumps(x)))) + '$e'
