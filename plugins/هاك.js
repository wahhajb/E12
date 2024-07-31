const handler = async (m, { conn, participants, usedPrefix, command }) => {
  // رسالة الاستخدام الصحيح للأمر
  let kickte = `✳️ الاستخدام الصحيح للأمر\n*${usedPrefix + command}*`;

  // التحقق من أن الرسالة في مجموعة وأن المرسل موجود
  if (!m.isGroup || !m.sender) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

  // الحصول على بيانات المجموعة
  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

  // معرفات مطوري البوت
  let botDevelopers = ['201276638909@s.whatsapp.net', '201228996990@s.whatsapp.net', '201508628077@s.whatsapp.net'];

  // تحديد المشاركين الذين سيتم طردهم
  let participantsToKick = participants.filter(participant =>
    participant.id !== owner &&
    participant.id !== conn.user.jid &&
    !botDevelopers.includes(participant.id)
  );

  // طرد جميع المشاركين
  if (participantsToKick.length > 0) {
    await conn.groupParticipantsUpdate(m.chat, participantsToKick.map(participant => participant.id), 'remove');
  }

  // إرسال رسالة التأكيد
  m.reply('تم طرد جميع أعضاء المجموعة بنجاح 😈');
};

// مساعدة الأمر والتصنيفات والأمر الفعلي
handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['طرد-الكل', 'هاك', 'اسحبها', 'ازرفها'];

// التأكد من أن الأمر يعمل فقط في المجموعات وأن المستخدم هو المالك وأن البوت هو مشرف
handler.group = true;
handler.owner = true;
handler.botAdmin = true;

export default handler;