declare function getUuidByString(string: string): string

declare interface Window {
  getUuidByString(string: string): string
  getUUID(string: string): string
}

declare namespace getUuidByString {

}

export = getUuidByString
