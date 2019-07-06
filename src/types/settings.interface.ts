import { ISession, ISessionForm } from "./session.interface";

export interface ISettings {
  sessions: ISession[]
  playSound: boolean
}
export interface ISettingsForm {
  sessions: ISessionForm[]
  playSound: boolean
}
