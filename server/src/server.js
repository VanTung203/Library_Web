const express = require('express');
const cors = require('cors');
const route = require('./route/index');
const connectDB = require('./config/Connect');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const ModelUser = require('./Model/ModelUser');
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
route(app);

connectDB();

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

app.post('/api/email', (req, res) => {
    ModelUser.findOne({ masinhvien: req.body.email }).then((dataUser) => {
        if (dataUser) {
            const emailUser = dataUser.email;
            const sendMail = async () => {
                try {
                    const accessToken = await oAuth2Client.getAccessToken();
                    const transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: 'Hanpage4@gmail.com',
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            refreshToken: REFRESH_TOKEN,
                            accessToken: accessToken,
                        },
                    });
                    const info = await transport.sendMail({
                        from: '"Thông Báo Sách Sắp Hết Hạn" <Hanpage4@gmail.com>', // sender address
                        to: emailUser,
                        subject: 'Thanks',
                        text: 'Hello world?',
                        html: `<b>
                            Thân gửi bạn ${emailUser},<br/><br/>
                            Đây là thông báo từ thư viện về việc mượn sách của bạn:<br/>
                            Một hoặc nhiều cuốn sách bạn đang mượn sắp đến hạn hoặc đã quá hạn trả.<br/><br/>
                            Vui lòng kiểm tra lại thông tin mượn sách và đến thư viện để trả sách đúng hạn.<br/><br/>
                            Nếu bạn đã trả sách rồi, xin vui lòng bỏ qua email này.<br/><br/>
                            Trân trọng,<br/>
                            Thư viện
                        </b>`,
                    });
                } catch (error) {
                    console.log('Error sending email:', error);
                }
            };
            sendMail();
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
