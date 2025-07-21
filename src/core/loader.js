import { REST, Routes, Collection, Client } from "discord.js"
import fg from 'fast-glob'
import { useAppSotre } from '@/store/app'

const updateSlashCommands = async(commands) =>{
    const rest = new REST({version:10}).setToken(process.env.TOKEN)
    const result = await rest.put(
        Routes.applicationCommands(
            process.env.APPLICATION_ID,
        ),
        {
        body: commands,
        },
    )
}

export const loadCommands = async() => {
    const appStore = useAppSotre()
    const commands = []
    const actions = new Collection()
    const files = await fg('./src/commands/**/index.js')
    for(const file of files){
        const cmd = await import(file)
        commands.push(cmd.command)
        actions.set(cmd.command.name, cmd.action)

    }
    await updateSlashCommands(commands)
    appStore.commandsActionMap = actions
}

export const loadEvents = async() => {
    const appStore = useAppSotre()
    const client = appStore.client
    const files = await fg('./src/events/**/index.js')
  for (const file of files) {
    const eventFile = await import(file)
    if (eventFile.event.once) {
        client.once(eventFile.event.name, eventFile.action)
    } 
    else{
        client.on(eventFile.event.name, eventFile.action)
        }
    }
}