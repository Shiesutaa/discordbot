import { Events } from 'discord.js'
import { useAppSotre } from '@/store/app'
export const event = {
    name: Events.InteractionCreate
}

export const action = async(interaction) => {
    if(!interaction.isChatInputCommand()) return
    const appStore = useAppSotre()
    const action = appStore.commandsActionMap.get(interaction.commandName)

    await action(interaction)
}