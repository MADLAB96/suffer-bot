export type ResponseArgs = {
    id: string,
    res?: string,
    aliases?: string[],
    attachment?: any,
    tts?: boolean
}

export type CommandArgs = {
    id: string,
    description: string,
    run: any,
    aliases?: string[],
    examples?: string[],
    args?: RunArgs[],
    attachment?: any,
    tts?: boolean,
}

export type RunArgs = {
    key: string,
    type: string,
    default?: any,
    infinite?: boolean
}