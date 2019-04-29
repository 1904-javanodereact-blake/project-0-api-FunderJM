import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { allUsers, findByUserId, findByUsernameAndPassword, updateUser } from '../daos/user.dao';
import { User } from '../build/dist/model/user';
// import bodyParser = require('body-parser');

export const userRouter = express.Router();

userRouter.get('', [
    authMiddleware(['Finance Manager', 'Admin']),
    async (req, res) => {
        const result = await allUsers();
        res.json(result.rows);
    }
]);

userRouter.get('/:id', authMiddleware(['Finance Manager', 'Admin']), async (req, res) => {
    console.log('finding user with id' + req.params.id);
    const id: number = +req.params.id;
    const employee = await findByUserId(id);
    if (employee) {
        res.status(200).json(employee);
    } else {
        res.sendStatus(404);
    }
});

userRouter.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body) {
        const username = req.body.username;
        const password = req.body.password;
        const attempt = await findByUsernameAndPassword(username, password);
        console.log(attempt);
        if (attempt) {
            req.session.user = attempt;
            res.json(attempt);
        } else {
            res.status(400).send('invalid credentials'); // sendStatus(400);
        }
    } else {
        res.status(400).send('Unable to login at this time');
    }
});


userRouter.patch('', authMiddleware(['Admin']), async (req, res) => {
    const bod = req.body;
    const tempUser = new User( undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempUser) {
        if (bod[field] != undefined) {
            tempUser[field] = bod[field];
        }
    } if (tempUser.userId != undefined) {
        const updateReturn = await updateUser(tempUser.userId, tempUser.username, tempUser.password, tempUser.firstname, tempUser.lastname, tempUser.email, tempUser.role);
        if (updateReturn) {
            res.status(202);
            res.json(updateReturn);
        }
        else {
            res.sendStatus(400);
        }
    }
    else {
        res.sendStatus(400);
    }
});