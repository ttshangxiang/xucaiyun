export interface file {
  _id?: string
  type: string
  filename: string,
  path: string
  size: string
  status: number
  description?: string
  groups?: Array<string>
  normal?: string
  thumb?: string
  width?: number
  height?: number
  utime: string
  ctime: string,
}

export interface ufile {
  type: string
  filename: string
  size: string
  path: string
  percent: number
  file: File
}

export interface group {
  ctime: string,
  description: string
  name: string
  status: number
  thumb: string
  type: string
  utime: string
  _id: string
}
