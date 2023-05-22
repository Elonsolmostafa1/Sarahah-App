import nodemailer from 'nodemailer'

export const sendEmail = async(options)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "mostafaahmed21121997@gmail.com", // generated ethereal user
          pass: "lptvtzxjbsicbalu" // generated ethereal password
        },
      });
    
      
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Elonol Sara7a App 👻" <mostafaahmed21121997@gmail.com>`, // sender address
        to: options.email, // list of receivers
        subject: "Elonsol Sara7a App ✔", // Subject line
        html: options.html  // html body
      });
}