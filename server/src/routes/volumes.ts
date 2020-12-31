import express from 'express';
import db from '../index';
import { IVolume } from '../interfaces';

const router = express.Router();

// GET all volumes
router.get('/', (_, res) => {
    db.collection('volumes')
        .get()
        .then((result) => {
            const response: IVolume[] = [];
            result.forEach((doc) => {
                response.push(doc.data() as IVolume);
            });
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// GET a single volume
router.get('/:id', (req, res) => {
    const doc = db.collection('volumes').doc(req.params.id);
    doc.get()
        .then((doc) => {
            if (doc.exists) res.status(200).send(doc.data());
            else res.status(404).send('No such document found.');
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// POST a single volume
router.post('/', (req, res) => {
    db.collection('volumes')
        .doc(String(req.body.id))
        .set({
            title: req.body.title,
            author: req.body.author,
            link: req.body.link,
        })
        .then(() => {
            res.status(200).send(`Document written with ID: ${req.body.id}`);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

export default router;
