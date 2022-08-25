type redisConnectOptions = {
    url: string
}
type redisConnectOptions2 = {
    host?: string,
    port?: number,
    username?: string,
    password?: string
}

interface stringFunctions {
    setValue: (key: string, value: string) => Promise<string>
    getValue: (key: string) => Promise<string>
}
interface arrayFunctions {
    pushList: (key: string, value: string) => Promise<number>
    getList: (key: string) => Promise<Array<string>>
    setList: (key: string, value: Array<string>) => Promise<number>
    removeElement: (key: string, value: string, num?: number ) => Promise<number>
    getIndex: (key: string, index: number) => Promise<string>
}
interface hashFunctions {
    setObject: <T>(key: string, obj: T) => Promise<T>
    setObjectValue: (key:string, paramName:string, paramValue: string) => Promise<number>
    getObject: (key: string, field?: string) => Promise<any> | Promise<string>
    delField: (key: string, field: string) => Promise<number>
    objExistsField: (key: string, field: string) => Promise<boolean>
}
interface setFunctions {
    setExists: (key: string, value: string) => Promise<boolean>
    setGetAll: (key: string) => Promise<Array<string>>
    setLength: (key: string) => Promise<number>
    setRemove: (key: string, value: string) => Promise<number>
    setPush: (key: string, value: string) => Promise<number>
}

interface redisInstance {
    string: stringFunctions
    array: arrayFunctions
    hash: hashFunctions
    set: setFunctions
    removeKey: (key: string) => Promise<number>
    existsKey: (key: string) => Promise<number>
    closeConn: () => Promise<void>
}

declare interface RedisService {
    initRedis: (options: string | redisConnectOptions | redisConnectOptions2) => redisInstance;
}