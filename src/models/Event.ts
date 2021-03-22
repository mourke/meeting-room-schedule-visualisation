import {Person} from './Person'

export enum EventType {
    call,
    birthday,
    catchup,
    conference
}

export type Event = {
    name: string
    overview: string
    category: EventType
    time: Date
    duration: number
    attendees: [Person]
}
