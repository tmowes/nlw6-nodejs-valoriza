declare namespace Express {
  export interface Request {
    user_id: string
  }
}

type CustomEnvVar = 'CUSTOM_ENV'

type ProcessEnvExtended = {
  [key in CustomEnvVar]: string
}

declare namespace NodeJS {
  export interface ProcessEnv extends ProcessEnvExtended {}
}
