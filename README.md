<div align="center">

<br />

<img width="650" src="https://lh3.googleusercontent.com/VsKPqXDv-xwuXa0Lk9yJkyjf3ors01XQRWzb0ga1FcQ30Cxwbwn9iUWPP6jtLxJtOmF75OlCShKI0Jk2cxg4opyr3tk3M4P0DFXXmhVy2kw9NvwWIxtTPSMQnvGK2t3Ij0F1UNBgDy0BY0Xn0egLqcshwdMHN7dSiB_RNt2qSB_d1v3rlU6GwxRfEZ1Kb5E3z_vIgXP43MI3TaeIkRc30Dn3mY9-TcaCuQIxVzdUj2ThCZ--Rxad4-rGG9gGWLv4JqQ3HeKPKFswrWgMrDTywFU9IW7Qn_scus3S8W3unCHH3PkuW7LgeUe14YaYzfrxDfhz-6jOp2ik3z4d-maNsIHz2rxqNBNZ2gqpg_nRXgEt19sUQjeEQbip7V5ZazRPD6ufc5TqzUKIHO9xmIVF1WGY_V2u7f98ufxRVl4PLxi-As7JF5kWC5PIHP0GLByHY58rgfEuoNyrPdmy6pe9kuQ-WTJzlGauIFxWuY5wZercjh3TJ-C1cX_VIorR9qb5-TC0c0zKFSmNZbUf8nh0WoR0LBuleSxEimtLgvCedziIuwIhiR4K9XDzL3zjB38Q03AiS1cTti2zafSABT4qpJhaKDAwSVFlRnAltS0Pn4FTQTD7aD7MT5FtgNz7E3IahWMZCgWNDv71KXc3R0Q2Ki3Awy8AUHltPwMBiscjU-3x2vHgMQVIsnymm0suFqFn-AUAu_PfYoh9y_8VIX8ZpfKYuFSD3yiwqC8Y=w1280-h305-no" alt="bulk-mail-cli by Kumar Abhirup">

[![Type](https://img.shields.io/badge/type-CLI-yellow.svg?style=flat-square)](https://www.npmjs.com/package/bulk-mail-cli)
[![npm](https://img.shields.io/badge/npm-bulk--mail--cli-CB3837.svg?style=flat-square)](https://www.npmjs.com/package/bulk-mail-cli)
[![Version](https://img.shields.io/badge/version-v2.0.0-green.svg?style=flat-square)](https://www.npmjs.com/package/bulk-mail-cli)
[![](https://travis-ci.com/KumarAbhirup/bulk-mail-cli.svg?branch=master)](https://github.com/KumarAbhirup/bulk-mail-cli)
[![Twitter](https://img.shields.io/twitter/follow/kumar_abhirup.svg?style=social&label=@kumar_abhirup)](https://twitter.com/kumar_abhirup/)
[![GitHub stars](https://img.shields.io/github/stars/KumarAbhirup/bulk-mail-cli.svg?style=social&label=Stars)](https://github.com/KumarAbhirup/bulk-mail-cli)

</div>

<br /><br />

# 📦 `bulk-mail-cli`

### **Do quick, hassle-free email marketing with this small but very powerful tool! 🔥**

#### It sends automated, dynamic and beautifully designed HTML emails to your mailing list via your terminal! 😎

Ever felt a quick need to shoot a fabulous mail to your subscribers? Without any inconvenience of creating complex campaigns with MailChimp and MailGun? Just open your terminal, input the CSV and HTML file with dynamic text, and just shoot the mails with **bulk-mail-cli**!

## Features

📦 &nbsp;&nbsp; **Shoot mails using CSV**.

📝 &nbsp;&nbsp; Mail **dynamic HTML Templates** using the `{{fname|lname}}` syntax.

⏰ &nbsp;&nbsp; Set the sending **interval time** in Cron Expressions! Eg. `*/10 * * * * *`

📌 &nbsp;&nbsp; **Unlimited attachments!** Attach any files on your local computer or you may just provide a direct URL in configuration and `bulk-mail-cli` will download and send the attachment under dynamic filenames and pathnames.

⛅️ &nbsp;&nbsp; **Runs on cloud!** Can be run on AWS EC2 servers and on any Node.js droplet on DigitalOcean.

🔰 &nbsp;&nbsp; **It saves your campaign progress!** You can pause and resume the Mail Campaign from where you left the last time.

✨ &nbsp;&nbsp; **Use .env variables** to not hardcode the emails and passwords in configuration files.

👨‍🏫 &nbsp;&nbsp; **Contentful demo files provided!** You get many beautiful email templates to pick from!

𝔀 &nbsp;&nbsp; **WordPress and other CMS' friendly.** Just export the list of your users, change the email containing column name to `email` and you are good to go!

💃 &nbsp;&nbsp; **Active on Slack.** Join the [bulk-mail-cli Slack group](http://bit.ly/bulkmailcli) for suggestions, bugs reports, support, and core development.

🧪 &nbsp;&nbsp; **Tested on MacOS and Linux**.

<br /><br />

# 💃 Documentation

## Install `bulk-mail-cli`

Assuming that you have `node` and `npm` installed... Run the following in your terminal.

```bash
$ npm i -g bulk-mail-cli
```

<br />

## Get help

Just run `bulkmail support` in your terminal to see what commands and flags you can use to do awesome things.

<br />

## Generate demo Mail Templates and configuration files

To generate demo files, use the following command.

```bash
$ bulkmail demo
```

<br />

## Configuration file

```
{
  "credentials": {
    "email": "{{EMAIL}}",
    "password": "{{PASSWORD}}", // turn on less-secure-apps to send emails: https://myaccount.google.com/lesssecureapps?pli=1
    "host": "smtp.gmail.com", // depends on what service you are using
    "port": 465, // 465 / 587
    "secureConnection": true // boolean: true | false
  },
  "mail": {
    "subject": "Heya {{fname}} {{lname}}! Just wanted to say hi!",
    "from": "Chandler Bing <chandlerbing@friends.com>", // keep the format
    "to": "leads.csv", // path to csv (relative to where this file is)
    "theme": "themes/Newsletter/theme.html", // path to csv (relative to where this file is)
    "attachments": [
      // relative path to the attachment files. Keep this array `empty` if no attachments.
      // SEE THE EXAMPLES BELOW.
      {
        "filename": "{{fname}}'s Demo CSV.csv", // You may use string patterns in fileName
        "path": "leads.csv" // You may use string patterns in path too!
      },
      {
        "filename": "{{fname}} {{lname}}'s Resume.pdf",
        "path": "https://raw.githubusercontent.com/KumarAbhirup/resume/master/Kumar%20Abhirup%20CV.pdf"
      }
    ]
  },
  "configuration": {
    "mailInterval": "*/10 * * * * *", // Cron Expression: To mail every 10 seconds [ >= 10 seconds recommended ]
    "verbose": true // boolean: True if you want a log of the live process in the terminal.
  }
}
```

<br />

## Send the Mail 🔰🔰🔰

```bash
$ EMAIL="chandlerbing@friends.com" PASSWORD="secret" bulkmail -f bulkmail.json # reference the configuration file here
```

That will start the mailing process! After every mail it sends, it updates the configuration file with the emails that you sent the message to. So that when you run the same campaign next time, it will resume from where you paused. **To start over, you can append the `--restart` flag to the command.**

<br />

## Writing data in CSV

### List emails the right way!

If you use **WordPress**, you may just import the CSV file of users by using [this plugin](https://wordpress.org/plugins/users-customers-import-export-for-wp-woocommerce/).

- When you use that plugin, just change the `user-email` column name of the CSV file to just `email` so that to ensure no errors.

If you are feeding data from any other source or by manual means, **please for the GOD's SAKE ensure that you list emails only under the `email` column.**

If the CSV file has emails fed in some other coulumn name (such as `user-email`, `allEmails`, etc)... `bulk-mail-cli` would simply throw an error to \*_not work at all._

<br />

## Dynamic data

You may add any other column featuring custom data in the CSV. Namely `fname`, `lname`, `address`, etc... to use in the Subject and Body of your campaign mail. You can use the CSV fields everywhere in the configuration files.

### Syntax

The syntax can be used in the `email` section of the CSV and can also be used everywhere in the configuration file and HTML templates. The syntax will be processed by bulk-mail-cli to generate correct mail output.

```
{{Hi|Hello|Howdy}} 🙌

My name is {{fname}} {{lname}}.

How'yooou dooooing? 😁
```

...

You can also define `PASSWORD` environment variable so that you don't directly type it in the configuration file.

#### Command

```bash
$ PASSWORD=ThisIsAPassword bulkmail --file bulkmail.json
```

#### Configuration:

```
{
  "credentials": {
    ...
    "password": "{{PASSWORD}}"
    ...
  }
}
```

<br /><br />

# 📝 License

**GPL © [Kumar Abhirup](https://www.twitter.com/kumar_abhirup)**
<br />
_Follow me 👋 **on Twitter**_ → [![Twitter](https://img.shields.io/twitter/follow/kumar_abhirup.svg?style=social&label=@kumar_abhirup)](https://twitter.com/kumar_abhirup/)
