import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import { useAppSotre } from '@/store/app'
import { loadCommands,loadEvents } from '@/core/loader'


dotenv.config()

loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppSotre()
appStore.client = client
loadEvents()

// Log in to Discord with your client's token
client.login(process.env.TOKEN)