import { Context, Markup } from 'telegraf';

export async function boshMenu(ctx: Context) {
  try {
    await ctx.reply('🏠 Bosh menu', {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['👨‍🔧 Xizmat turini tanlash', '📙 Biz xaqimizda'],
        ['📞 Aloqa', '✍️ Prays'],
        ['🗑 Savatcha', '🤝 Hamkorlar'],
        ["💳 To'lov", '⚙️ Sozlamalar'],
      ])
        .resize()
        .oneTime(),
    });
  } catch (error) {
    console.log(error);
  }
}
