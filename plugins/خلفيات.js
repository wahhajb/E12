const _0x58319f = function () {
  let _0x4959a0 = true;
  return function (_0x5ad2ac, _0x37b6f2) {
    const _0x143836 = _0x4959a0 ? function () {
      if (_0x37b6f2) {
        const _0x3c0382 = _0x37b6f2.apply(_0x5ad2ac, arguments);
        _0x37b6f2 = null;
        return _0x3c0382;
      }
    } : function () {};
    _0x4959a0 = false;
    return _0x143836;
  };
}();
const _0x277374 = _0x58319f(this, function () {
  return _0x277374.toString().search("(((.+)+)+)+$").toString().constructor(_0x277374).search('(((.+)+)+)+$');
});
_0x277374();
const _0x249fc0 = function () {
  let _0x3b26e4 = true;
  return function (_0x4f7b16, _0x1b9b36) {
    const _0x3c800e = _0x3b26e4 ? function () {
      if (_0x1b9b36) {
        const _0x3cb54d = _0x1b9b36.apply(_0x4f7b16, arguments);
        _0x1b9b36 = null;
        return _0x3cb54d;
      }
    } : function () {};
    _0x3b26e4 = false;
    return _0x3c800e;
  };
}();
const _0x8d68e7 = _0x249fc0(this, function () {
  let _0x1cee6b;
  try {
    const _0x1b1e6c = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x1cee6b = _0x1b1e6c();
  } catch (_0x444f9d) {
    _0x1cee6b = window;
  }
  const _0x35152b = _0x1cee6b.console = _0x1cee6b.console || {};
  const _0x5744fb = ["log", 'warn', "info", "error", "exception", 'table', "trace"];
  for (let _0x43c859 = 0x0; _0x43c859 < _0x5744fb.length; _0x43c859++) {
    const _0x75004e = _0x249fc0.constructor.prototype.bind(_0x249fc0);
    const _0x334144 = _0x5744fb[_0x43c859];
    const _0x24954f = _0x35152b[_0x334144] || _0x75004e;
    _0x75004e.__proto__ = _0x249fc0.bind(_0x249fc0);
    _0x75004e.toString = _0x24954f.toString.bind(_0x24954f);
    _0x35152b[_0x334144] = _0x75004e;
  }
});
_0x8d68e7();
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import { wallpaper } from '@bochilteam/scraper';
const handler = async (_0x5b9bca, {
  conn: _0x2b223c,
  text: _0x4a83f2,
  usedPrefix: _0x139d8d
}) => {
  const _0x4728c6 = await getDevice(_0x5b9bca.key.id);
  if (!_0x4a83f2) {
    throw "استخدم أمر خلفيات عن طريق 🔎\n*.خلفيه Arthur*";
  }
  if (_0x4728c6 !== 'desktop' || _0x4728c6 !== 'web') {
    const _0x55a780 = await wallpaper(_0x4a83f2);
    var _0x30dd6a = await prepareWAMessageMedia({
      'image': {
        'url': _0x55a780.getRandom()
      }
    }, {
      'upload': _0x2b223c.waUploadToServer
    });
    const _0x10763e = {
      'body': {
        'text': ("- الـخـلفـيه الـمـراد الــبحث عـنـها : " + _0x4a83f2).trim()
      },
      'footer': {
        'text': ("❯ ⏐ " + global.wm).trim()
      },
      'header': {
        'title': "* *تـحـميل الخلفيات من الإنترنت 🖼️*",
        'subtitle': '',
        'hasMediaAttachment': true,
        'imageMessage': _0x30dd6a.imageMessage
      },
      'nativeFlowMessage': {
        'buttons': [{
          'name': "quick_reply",
          'buttonParamsJson': JSON.stringify({
            'display_text': "جيب خلفيه تاني",
            'id': ".wp0 " + _0x4a83f2
          })
        }],
        'messageParamsJson': ''
      }
    };
    let _0x5ba3ef = generateWAMessageFromContent(_0x5b9bca.chat, {
      'viewOnceMessage': {
        'message': {
          'interactiveMessage': _0x10763e
        }
      }
    }, {
      'userJid': _0x2b223c.user.jid,
      'quoted': _0x5b9bca
    });
    _0x2b223c.relayMessage(_0x5b9bca.chat, _0x5ba3ef.message, {
      'messageId': _0x5ba3ef.key.id
    });
  } else {
    _0x2b223c.sendFile(_0x5b9bca.chat, "JoAnimi•Error.jpg", _0x5b9bca);
  }
};
handler.help = ["خلفيه"];
handler.tags = ["For Test"];
handler.command = /^(wp0|خلفيه|خلفية|wallper)$/i;
export default handler;