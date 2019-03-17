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
  ctime: string
  loaded?: boolean
}

export interface ufile {
  type: string
  filename: string
  size: string
  path: string
  percent: number
  file: File,
  status: (0/*未开始*/ | 1/*传输中*/ | 2/*已完成*/ | -1/*已失败*/),
  error?: String
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
