import { SlashCommandBuilder } from "@discordjs/builders";
import { InteractionResponseType } from "discord-interactions";
import { MessageFlags } from "discord-api-types/v10";


export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!を返します"),

  async execute(interaction) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Pong!",
        flags: MessageFlags.Ephemeral
      }
    };
  }
}