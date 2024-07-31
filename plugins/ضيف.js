const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, text, participants, args }) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*[🚯] المطور قافل الاضافه! مش هينفع تضيف حد دلوقتي.*';
  if (!args[0]) throw '*[🚨] يا باشا، نسيت تكتب الرقم اللي عاوز تضيفه! اكتب الرقم وبعدين جرب تاني.*';
  
  try {
    const _participants = participants.map(user => user.id);
    const usersInput = text.split(',').map(v => v.replace(/[^0-9]/g, ''));
    const invalidUsers = usersInput.filter(v => v.length <= 4 || v.length >= 20);
    
    if (invalidUsers.length > 0) {
      const invalidNumbers = invalidUsers.join(', ');
      throw `*[🚨] الأرقام دي مش مظبوطة: ${invalidNumbers}. اتأكد إنك دخلت أرقام صح ومش فيها أي زلط.*`;
    }
    
    const users = (await Promise.all(
      usersInput.filter(v => !_participants.includes(v + '@s.whatsapp.net'))
        .map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us');

    const response = await conn.query({
      tag: 'iq',
      attrs: { type: 'set', xmlns: 'w:g2', to: m.chat },
      content: users.map(jid => ({ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid } }] }))
    });

    const pp = await conn.profilePictureUrl(m.chat).catch(_ => null);
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0);
    const add = getBinaryNodeChild(response, 'add');
    const participant = getBinaryNodeChildren(add, 'participant');

    for (const user of participant.filter(item => item.attrs.error == 403)) {
      const jid = user.attrs.jid;
      const content = getBinaryNodeChild(user, 'add_request');
      const invite_code = content.attrs.code;
      const invite_code_exp = content.attrs.expiration;
      const inviter = conn.user.name;  // اسم الشخص الذي دعا
      const groupName = await conn.getName(m.chat);
      const teks = `*[❗معلومة❗] للأسف الرقم @${jid.split('@')[0]} مش قادر ينضم دلوقتي. ممكن يكون الرقم غلط، أو الشخص مش موجود في المجموعة، أو حتى ممكن يكون غيّر إعدادات الخصوصية. حاول تتأكد من الرقم بنفسك.*`;
      
      m.reply(teks, null, { mentions: conn.parseMention(teks) });

      const captionn = `🚩 مرحبا بك ! أنا البوت التربو، وتمت دعوتك للانضمام لمجموعة "${groupName}" من قبل الادمن ${inviter} هو اللي دعاك، تعالي واستمتع معنا`;
      const messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer });
      const groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        groupInviteMessage: {
          groupJid: m.chat,
          inviteCode: invite_code,
          inviteExpiration: invite_code_exp,
          groupName: groupName,
          caption: captionn,
          jpegThumbnail: jpegThumbnail
        }
      }), { userJid: jid });
      
      await conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id });
    }
  } catch (error) {
    throw `*[❗معلومة❗] حصلت مشكلة في إضافة الرقم. ممكن الرقم يكون غلط، أو الشخص غادر المجموعة، أو حصل تغيير في إعدادات الخصوصية. حاول تتأكد بنفسك وحاول تاني.*`;
  }
};

handler.help = ['add', '+'].map(v => v + ' número');
handler.tags = ['group'];
handler.command = /^(اضافه|ضيف|añadir|\+)$/i;
handler.admin = handler.group = handler.botAdmin = true;

export default handler;