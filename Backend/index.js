const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const app = express();

// Aplicar correctamente el middleware express.json()
app.use(express.json());

app.post("/sent-email", async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        let info = await emailHelper(to, subject, text);
        res.status(200).send(`email sent: ${info.response}`);
    } catch (error) {
        res.status(500).send("error al enviar correo");
    }
});

app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
});
