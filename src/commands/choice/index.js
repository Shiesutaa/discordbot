import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
.setName('choice')
.setDescription('從你輸入的選項中隨機選一個')
.addStringOption(option => 
    option.setName('options')
    .setDescription('露比醬幫你想，選項用逗號分開')
    .setRequired(true)
)

export const action = async(interaction) => {
    const input = interaction.options.getString('options');
    const choices = input.split(/[\s，]+/).map(c => c.trim()).filter(Boolean);
    if (choices.length === 0) return interaction.reply('❌ 請至少提供一個選項！');
    const pick = choices[Math.floor(Math.random() * choices.length)];
    await interaction.reply(`比起薄荷巧克力，更喜歡：**${pick}**`);
}