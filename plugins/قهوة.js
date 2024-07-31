const _0x3feb28 = function () {
  let _0x1d4e90 = true;
  return function (_0x527856, _0x4130b6) {
    const _0x29cd31 = _0x1d4e90 ? function () {
      if (_0x4130b6) {
        const _0x5b791d = _0x4130b6.apply(_0x527856, arguments);
        _0x4130b6 = null;
        return _0x5b791d;
      }
    } : function () {};
    _0x1d4e90 = false;
    return _0x29cd31;
  };
}();
const _0x3bfb32 = _0x3feb28(this, function () {
  return _0x3bfb32.toString().search('(((.+)+)+)+$').toString().constructor(_0x3bfb32).search("(((.+)+)+)+$");
});
_0x3bfb32();
const _0x4d8f9e = function () {
  let _0x28b54f = true;
  return function (_0x591f55, _0x4a4014) {
    const _0x33e027 = _0x28b54f ? function () {
      if (_0x4a4014) {
        const _0xf456db = _0x4a4014.apply(_0x591f55, arguments);
        _0x4a4014 = null;
        return _0xf456db;
      }
    } : function () {};
    _0x28b54f = false;
    return _0x33e027;
  };
}();
const _0x2a402d = _0x4d8f9e(this, function () {
  const _0x4f7882 = function () {
    let _0x5b79fe;
    try {
      _0x5b79fe = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x461da3) {
      _0x5b79fe = window;
    }
    return _0x5b79fe;
  };
  const _0x5c4526 = _0x4f7882();
  const _0x2f6284 = _0x5c4526.console = _0x5c4526.console || {};
  const _0x36a6d3 = ['log', "warn", "info", "error", "exception", 'table', "trace"];
  for (let _0x372825 = 0x0; _0x372825 < _0x36a6d3.length; _0x372825++) {
    const _0x58c70a = _0x4d8f9e.constructor.prototype.bind(_0x4d8f9e);
    const _0xf13022 = _0x36a6d3[_0x372825];
    const _0x38f8ec = _0x2f6284[_0xf13022] || _0x58c70a;
    _0x58c70a.__proto__ = _0x4d8f9e.bind(_0x4d8f9e);
    _0x58c70a.toString = _0x38f8ec.toString.bind(_0x38f8ec);
    _0x2f6284[_0xf13022] = _0x58c70a;
  }
});
_0x2a402d();
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
const handler = async (_0x489441, {
  conn: _0x3a116e,
  text: _0x30d0bd,
  usedPrefix: _0x1db266
}) => {
  const _0x37c347 = await getDevice(_0x489441.key.id);
  if (_0x37c347 !== "desktop" || _0x37c347 !== "web") {
    var _0x518e62 = await prepareWAMessageMedia({
      'image': {
        'url': "https://coffee.alexflipnote.dev/random"
      }
    }, {
      'upload': _0x3a116e.waUploadToServer
    });
    const _0x2e17b8 = {
      'body': {
        'text': ''.trim()
      },
      'footer': {
        'text': "❯⏐ 𝐵𝛩𝑇 𝐸𝐿𝐴𝐾𝑅𝐴𝐵".trim()
      },
      'header': {
        'title': "* *احــتـســي الـبـعـض وسوف يصبح كل شيئ جـميل*",
        'hasMediaAttachment': true,
        'imageMessage': _0x518e62.imageMessage
      },
      'nativeFlowMessage': {
        'buttons': [{
          'name': "quick_reply",
          'buttonParamsJson': "{\"display_text\":\"جيب تاني\",\"id\":\".قهوه\"}"
        }],
        'messageParamsJson': ''
      }
    };
    let _0x352bd5 = generateWAMessageFromContent(_0x489441.chat, {
      'viewOnceMessage': {
        'message': {
          'interactiveMessage': _0x2e17b8
        }
      }
    }, {
      'userJid': _0x3a116e.user.jid,
      'quoted': _0x489441
    });
    _0x3a116e.relayMessage(_0x489441.chat, _0x352bd5.message, {
      'messageId': _0x352bd5.key.id
    });
  } else {
    _0x3a116e.sendFile(_0x489441.chat, "error.jpg", _0x489441);
  }
};
handler.help = ["قهوه"];
handler.tags = ["ازرار"];
handler.command = /^(قهوه|شربني)$/i;
export default handler;