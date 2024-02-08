import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@uoticketsdev/common';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res:Response) => {
    const ticket = Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
});

export { router as updateTicketRouter }