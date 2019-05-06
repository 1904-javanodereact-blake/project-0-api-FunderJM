import express from 'express';
import { findAllRequestByUserId, findAllRequestByStatusId, createNewRequest, updateRequest } from '../daos/reimbursement.dao';
import { authMiddleware } from '../middleware/auth.middleware';
export const reimbursementRouter = express.Router();

reimbursementRouter.get(`/author/userId/:userId`, async (req, res) => {
    const id = +req.params.userId;
    console.log(id);
    const employeerequest = await findAllRequestByUserId(id);
    if (employeerequest) {
        res.status(200).json(employeerequest);
    } else {
        res.sendStatus(404);
    }
});

reimbursementRouter.get(`/status/:statusId`, async (req, res) => {
    const statid = +req.params.statusId;
    console.log(statid);
    const employeerequest = await findAllRequestByStatusId(statid);
    if (employeerequest) {
        res.status(200).json(employeerequest);
    } else {
        res.sendStatus(404);
    }
});

reimbursementRouter.post(``, [ async (req, res) => {
    const author = req.body.author;
    const reimburseAmount = req.body.amount;
    const todaysDate = req.body.datesubmitted;
    const reimburseDescr = req.body.description;
    const reimburseType = req.body.type;
    const employeereimburse = await createNewRequest(author,  reimburseAmount, todaysDate, reimburseDescr, reimburseType);
    if (employeereimburse) {
        res.status(200).json(employeereimburse);
    } else {
        res.sendStatus(404);
    }
}]);

reimbursementRouter.patch(``, authMiddleware(['Finance Manager', 'Admin']), async (req, res) => {
    const reimburseId = req.body.reimbursementid;
    const dateresolved = req.body.dateresolved;
    const resolver = req.body.resolver;
    const stat = req.body.status;
    const updatereq = await updateRequest(reimburseId, dateresolved, resolver, stat);
    if (updatereq) {
        res.status(200).json(updatereq);
    } else {
        res.sendStatus(404);
    }
});