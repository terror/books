import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import db from '../index';
import {
    IHighlight,
    IVolume,
    IReadwiseHighlight,
    IReadwiseVolume,
} from '../interfaces';
dotenv.config();

const router = express.Router();

// Fetch and update all books
router.post('/volumes', (_, res) => {
    const URL = 'https://readwise.io/api/v2/books/';
    const populateData = (URL: string) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: 'Token ' + process.env.READWISE_TOKEN!,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(async (volume: IReadwiseVolume) => {
                    db.collection('volumes')
                        .where('id', '==', volume.id)
                        .get()
                        .then((snap) => {
                            if (snap.empty) {
                                const data: IVolume = {
                                    id: volume.id,
                                    title: volume.title,
                                    author: volume.author,
                                    link: volume.cover_image_url,
                                };
                                fetch(process.env.API_URL + 'volumes', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });
                            }
                        });
                    if (response.next) populateData(response.next);
                });
            })
            .catch((err) => {
                res.status(500).send(`Error: ${err}`);
            });
    };
    populateData(URL);
    res.status(200).send('Books updated successfully');
});

// Fetch and update all highlights
router.post('/highlights', (_, res) => {
    const URL = 'https://readwise.io/api/v2/highlights/';
    const populateData = (URL: string) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: 'Token ' + process.env.READWISE_TOKEN!,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach((highlight: IReadwiseHighlight) => {
                    db.collection('highlights')
                        .where('id', '==', highlight.id)
                        .get()
                        .then((snap) => {
                            if (snap.empty) {
                                const data: IHighlight = {
                                    id: highlight.id,
                                    text: highlight.text,
                                    volume: highlight.book_id,
                                };
                                fetch(process.env.API_URL + 'highlights', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });
                            }
                        });
                    if (response.next) populateData(response.next);
                });
            })
            .catch((err) => {
                res.status(500).send(`Error: ${err}`);
            });
    };
    populateData(URL);
    res.status(200).send('Highlights synced successfully');
});

export default router;
