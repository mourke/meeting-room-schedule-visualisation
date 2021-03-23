import {Person} from './Person'

export enum EventType {
    call = `#0085e3`,
    birthday = `#ff623b`,
    catchup = `#00a89d`,
    conference = `#b891ff`
}

export type Event = {
    name: string
    overview: string
    category: EventType
    time: Date
    duration: number // in minutes
    attendees: Person[]
}

