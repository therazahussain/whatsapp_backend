const router = require("express").Router();

const token = process.env.TOKEN;

router.get("/webhook", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(404);
    }
  }
});

router.post("/webhook", (req, res) => {
  let body_param = req.body;

  console.log("not heree");

  if (body_param.object) {
    console.log("inside heree");
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phone_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

      console.log("inside heree");
      console.log("inside heree");
      console.log("inside heree");
      console.log("inside heree");

      console.log(msg_body);

      axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v14.0/" +
          phone_no_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "Thank's A lot.",
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.status(200).json({ message: msg_body });
    }
  }
});

module.exports = router;
