import nodemailer from "nodemailer"
import {config} from "../configs/env.config.js"

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user: config.EMAIL_USER,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN
    }
})

transporter.verify((error, success)=>{
    if(error){
        console.log("error connecting to email server : ", error)
    }else{
        console.log("Email server is ready to send messages")
    }
})


const sendEmail = async (to,  subject, text, html) => {
    try{
        const info =await transporter.sendMail({
            from: `"Bank System" <${config.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        })
    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }catch(error){
        console.log("error to send email : ", error)
    }
}

    const sendRegisterEmailToUser = async (name, email) =>{
            const subject = 'Welcome to Bank System'
            const text = `Hello ${name},\n\nThank You for registering at Bank system. we're excited to have you on board:\n\nBest regards, \nThe Bank System Team`
            const html = `<p>Hello ${name},</p><p>Thank You for registring at Bank System</p>`

            await sendEmail(email, subject, text, html)
        }
        
        
 export const sendTransactionSuccessMail = async ({email, name, amount, account}) => {
  const subject = "Transaction Successful";

  const text = `
Hi ${name},

Your transaction has been completed successfully.

Amount: ₹${amount}
Credited To Account: ${account}

Thank you for using our banking service.

Bank System Team
`;

  // nodemailer send example
  await transporter.sendMail({
    to: email,
    subject,
    text
  });
};

export default sendRegisterEmailToUser