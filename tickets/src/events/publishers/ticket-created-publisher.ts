import { Publisher, Subjects, TicketCreatedEvent } from "@uoticketsdev/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}