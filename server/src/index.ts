import express from 'express';
import * as admin from 'firebase-admin';
import * as serviceAccount from './key.json';
import volumeRouter from './routes/volumes';
import highlightRouter from './routes/highlights';
import syncRouter from './routes/sync';

const app = express();
const port = 5000;
const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

// Initialize firebase
admin.initializeApp({
    credential: admin.credential.cert(params),
});

const db = admin.firestore();

app.use(express.json());
app.use('/api/volumes', volumeRouter);
app.use('/api/highlights', highlightRouter);
app.use('/api/sync', syncRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default db;
