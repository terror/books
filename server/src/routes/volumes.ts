import express, { Request, Response } from 'express';
import db from '../index';
import { IVolume } from '../interfaces';
import { statusCodes } from '../config/statusCodes';

const router = express.Router();

// @type GET
// @desc Route for retrieving all volumes in the collection
// @route /api/volumes
// @access public
router.get('/', (_, res: Response) => {
    db.collection('volumes')
        .orderBy('updated', 'desc')
        .get()
        .then((result) => {
            const response: IVolume[] = [];
            result.forEach((doc) => {
                response.push(doc.data() as IVolume);
            });
            res.status(statusCodes.SUCCESS).send(response);
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

// @type GET
// @desc Route for retrieving a specific volume from the collection
// @route /api/volumes/:id
// @access public
router.get('/:id', (req: Request, res: Response) => {
    const doc = db.collection('volumes').doc(req.params.id);
    doc.get()
        .then((doc) => {
            if (doc.exists) res.status(statusCodes.SUCCESS).send(doc.data());
            else
                res.status(statusCodes.NOT_FOUND).send(
                    'No such document exists.'
                );
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

export default router;
