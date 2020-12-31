import express from 'express';
import db from '../index';
import { IHighlight } from 'src/interfaces';

const router = express.Router();

// GET a single highlight by ID
router.get('/:id', (req, res) => {
    const doc = db.collection('highlights').doc(req.params.id);
    doc.get()
        .then((doc) => {
            if (doc.exists) res.status(200).send(doc.data());
            else res.status(404).send('No such document exists.');
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// GET all highlights belonging to the same book
router.get('/book/:id', async (req, res) => {
    db.collection('highlights')
        .where('volume', '==', parseInt(req.params.id))
        .get()
        .then((snap) => {
            if (snap.empty) {
                res.status(404).send('No such document exists.');
                return;
            }
            const response: IHighlight[] = [];
            snap.docs.forEach((doc) => {
                response.push(doc.data() as IHighlight);
            });
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// POST a single highlight
router.post('/', (req, res) => {
    db.collection('highlights')
        .add({
            id: req.body.id,
            highlight: req.body.text,
            volume: req.body.volume,
        })
        .then((doc) => {
            res.status(200).send(`Document written with ID: ${doc.id}`);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

export default router;
