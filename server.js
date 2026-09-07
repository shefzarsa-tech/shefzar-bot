const express = require('express');
const app = express();

app.use(express.json());

// كلمة التحقق الخاصة بالـ Webhook
const VERIFY_TOKEN = "shefzar_token_2026";

// مسار التحقق لربط Meta Webhook
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// مسار استقبال الرسائل من العملاء
app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log('رسالة جديدة:', JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`السيرفر يعمل على المنفذ ${PORT}`));
