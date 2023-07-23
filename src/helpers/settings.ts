import { Context, Markup } from 'telegraf';

export async function settings(ctx: Context, user: any) {
  try {
    await ctx.reply(
      `<b>⚙️ Sozlamalar</b>\n\n<b>Ismingiz : <i>${user.real_name}</i></b>\n<b>Telefon raqamingiz : <i>${user.phone_number}</i></b>`,
      {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ["👤 Ism o'zgartirish", "📱 Telefon raqamni o'zgartirish"],
          ['⬅️ Ortga', '🏠 Bosh menu'],
        ])
          .oneTime()
          .resize(),
      },
    );
  } catch (error) {
    console.log(error);
  }
}
