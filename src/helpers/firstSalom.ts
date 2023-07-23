import { Context } from 'telegraf';

export async function firstSalom(ctx: Context) {
  try {
    await ctx.reply(
      `<b><i>👋 Assalomu alaykum</i> "iPro universal group" <i>rasmiy botiga xush kelibsiz 😊.</i> </b>\n`,
      { parse_mode: 'HTML' },
    );
  } catch (error) {
    console.log(error);
  }
}
