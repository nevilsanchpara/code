const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
let corsOptions = {
  origin: "*"
};


const app = express();
app.use(express.json());
app.use((req, res, next) => {
   res.header({"Access-Control-Allow-Origin": "*"}); 
   next(); 
})
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

const staticEmails = ['nsanchpara203@gmail.com', 'gevobiw856@pixdd.com','deepsutariya123@hotmail.com', 'deepsutariya123@gmail.com'];

app.post('/send-email', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Missing required fields: text' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sagarnakrani225@gmail.com',
        pass: 'gpyibcrcwvtvijbp'
      },
      port: 465,
      host: 'smtp.gmail.com',
      secure: true,
    });

    const mailOptions = {
      from: 'sagarnakrani225@gmail.com',
      to: staticEmails.join(','), 
      subject: `Nodemailer tutorial!`,
      text: `${text} at ${new Date()}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
