import express from 'express';
import db from '../index';
import { IHighlight } from 'src/interfaces';
import { statusCodes } from '../config/statusCodes';

const router = express.Router();

// @type GET
// @desc Route for retrieving a single highlight from the collection
// @route /api/highlights/:id
// @access public
router.get('/:id', (req, res) => {
    const doc = db.collection('highlights').doc(req.params.id);
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

// @type GET
// @desc Route for retrieving all highlights from a single volume
// @route /api/highlights/volume/:id
// @access public
router.get('/volume/:id', (req, res) => {
    db.collection('highlights')
        .where('volume', '==', parseInt(req.params.id))
        .get()
        .then((snap) => {
            if (snap.empty) {
                res.status(statusCodes.NOT_FOUND).send(
                    'No such document exists.'
                );
                return;
            }
            const response: IHighlight[] = [];
            snap.docs.forEach((doc) => {
                response.push(doc.data() as IHighlight);
            });
            res.status(statusCodes.SUCCESS).send(response);
        })
        .catch((err) => {
            res.status(statusCodes.SERVER_ERROR).send(err);
        });
});

export default router;
