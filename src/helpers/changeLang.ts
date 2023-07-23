import { Context, Markup } from 'telegraf';

export async function changeLang(ctx: Context) {
  try {
    await ctx.reply(
      '🇺🇿 Iltimos tilni tanlang\n🇷🇺 Пожалуйста, выберите язык\n🇺🇸 Please select a language',
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          Markup.button.callback('🇺🇿 UZ', 'changeuz'),
          Markup.button.callback('🇷🇺 RU', 'changeru'),
          Markup.button.callback('🇺🇸 EN', 'changeen'),
        ]),
      },
    );
  } catch (error) {
    console.log(error);
  }
}
