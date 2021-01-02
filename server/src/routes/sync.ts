import express, { Response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import db from '../index';
import { IReadwiseHighlight, IReadwiseVolume } from '../interfaces';
import { statusCodes } from '../config/statusCodes';
dotenv.config();

const router = express.Router();

// @type POST
// @desc Route for syncing readwise volumes with the collections volumes
// @route /api/sync/volumes
// @access public
router.post('/volumes', (_, res: Response) => {
    const URL = 'https://readwise.io/api/v2/books/';
    const populateData = (URL: string) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: 'Token ' + process.env.READWISE_TOKEN,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(async (volume: IReadwiseVolume) => {
                    const snap = await db
                        .collection('volumes')
                        .where('id', '==', volume.id)
                        .get();
                    if (
                        snap.empty ||
                        (!snap.empty &&
                            snap.docs[0].data()['updated'] != volume.updated)
                    ) {
                        db.collection('volumes').doc(String(volume.id)).set({
                            id: volume.id,
                            title: volume.title,
                            author: volume.author,
                            category: volume.category,
                            updated: volume.updated,
                            image_url: volume.cover_image_url,
                        });
                    }
                    if (response.next) populateData(response.next);
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
    try {
        populateData(URL);
        res.status(statusCodes.SUCCESS).send('Books updated successfully');
    } catch (err) {
        res.status(statusCodes.SERVER_ERROR).send(err);
    }
});

// @type POST
// @desc Route for syncing readwise highlights with the collections highlights
// @route /api/sync/highlights
// @access public
router.post('/highlights', (_, res) => {
    const URL = 'https://readwise.io/api/v2/highlights/';
    const populateData = (URL: string) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: 'Token ' + process.env.READWISE_TOKEN,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(
                    async (highlight: IReadwiseHighlight) => {
                        const snap = await db
                            .collection('highlights')
                            .where('id', '==', highlight.id)
                            .get();
                        if (snap.empty) {
                            db.collection('highlights').add({
                                id: highlight.id,
                                text: highlight.text,
                                volume: highlight.book_id,
                            });
                        }
                        if (response.next) populateData(response.next);
                    }
                );
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
    try {
        populateData(URL);
        res.status(statusCodes.SUCCESS).send('Highlights synced successfully');
    } catch (err) {
        res.status(statusCodes.SERVER_ERROR).send(err);
    }
});

export default router;
