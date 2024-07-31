import Presence from '@adiwajshing/baileys'
let handler  = async (m, { conn, args, text }) => {
if (!text) throw `*مثال : .تغير-الاسم ┋𝐓𝐀𝐑𝐁𝐎𝐎 𝐁𝐎𝐓┋*`
try {
let text = args.join` `
if(!args || !args[0]) {
} else {
conn.groupUpdateSubject(m.chat, text)}
} catch (e) {
throw '*مثال : .تغير الاسم ┋𝐓𝐀𝐑𝐁𝐎𝐎 𝐁𝐎𝐓┋*'
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(تغير-الاسم|تغيرالنيم|تغير-النيم|الاسم|تغيرالاسم)$/i
handler.group = true
handler.admin = true
export default handler
