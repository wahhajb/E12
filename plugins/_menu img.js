import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs';
import moment from 'moment-timezone';
import { promises } from 'fs';
import { join } from 'path';

// تحديد المنطقة الزمنية
const timezone = 'Africa/Egypt';
const time = moment.tz(timezone).format('HH');
const wib = moment.tz(timezone).format('HH:mm:ss');

// دالة لتحويل الوقت إلى سلسلة نصية
const clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
};

let handler = async (m, { conn, usedPrefix, command }) => {
    // الحصول على التاريخ والوقت
    let d = new Date(Date.now() + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    // تحديد المرسل
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    // التحقق من وجود المستخدم في قاعدة البيانات
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`;

    // الحصول على بيانات المستخدم
    let user = global.db.data.users[who];
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = user;
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let rtotal = Object.entries(global.db.data.users).length || '0';
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let taguser = conn.getName(m.sender); // الحصول على الاسم بدلاً من الرقم

    // إرسال الرسالة
    global.fcontact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: 'status@broadcast'
        },
        message: {
            contactMessage: {
                displayName: `${name}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    };

    await conn.sendMessage(m.chat, {
        text: 'تم إرسال الرسالة بنجاح!'
    }, { quoted: global.fcontact });

    // الرسالة الترحيبية
    const img = './Menu.png';
    const str = `
> *✧────[ 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 ]────╮*
> *┤ *مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: Mahmoud Mahmed*
> *┤ #️⃣ الرقم: wa.me/201225655220*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···*
> *✧────[معـلـومـات الـمسـتـخـدم]────╮*
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤────────────···* 
> *✧────[ الـوقـت والـتـاريـخ ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*
> ➻𒍜➻『➳ᴹᴿ᭄𝒁𝒆𝒛𝒐➳ᴹᴿ᭄』`;

    await conn.sendMessage(m.chat, { text: str });

    // قائمة الأزرار
    const buttons = [
        {
            header: 'info',
            title: '⌬ ❛╏المطور',
            description: '',
            id: '.المطور'
        },
        {
            header: '『』الايديت《',
            title: '⌬ ❛╏ايديت',
            description: '',
            id: '.ايديت'
        },
        {
            header: '『』تطقيمات《',
            title: '⌬ ❛╏تطقيم',
            description: '',
            id: '.تطقيم'
        },
        {
            header: '『』تطقيمات《',
            title: '⌬ ❛╏اولاد',
            description: '',
            id: '.طقم2'
        },
        {
            header: '『』عمك《',
            title: '⌬ ❛╏ميسي',
            description: '',
            id: '.ميسي'
        },
        {
            header: '『』عمك2《',
            title: '⌬ ❛╏كريس',
            description: '',
            id: '.رونالدو'
        },
        {
            header: '『』قول مياو《',
            title: '⌬ ❛╏مياو',
            description: '',
            id: '.قط'
        },
        {
            header: '『』كلب《',
            title: '⌬ ❛╏كلب',
            description: '',
            id: '.كلب'
        }
    ];

    const buttonMessage = {
        body: {
            text: ''
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'اضغط',
                        sections: [
                            {
                                title: 'قسم الايديت',
                                highlight_label: 'new',
                                rows: buttons
                            }
                        ]
                    }),
                    messageParamsJson: ''
                }
            ]
        }
    };

    await conn.sendMessage(m.chat, buttonMessage);
};

// تصدير المعالج
handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['2'];

export default handler;