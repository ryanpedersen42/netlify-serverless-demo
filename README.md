# Serverless Functions Demo

### Netlify
#### Commands

Before running commands, have a skeleton git project (with public folder and html) to initialize netlify in.

```
npm install netlify-cli -g
netlify
netlify login
netlify init
```

#### Envars to Define
```
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_MESSAGING_SERVICE_SID
PHONE_NUMBER_DESTINATION
MAILGUN_API_KEY
MAILGUN_DOMAIN
```

### Twilio
1. Sign Up for Account and verify email address
2. Buy phone number (with SMS enabled) and go through the setup process.
3. Go to Messaging (Left Sidebar) > Try it out > Send and SMS and send a test to your personal number.
4. Look at the NodeJS code example. Note the `messagingServiceSid` and `accountSid` there.
5. Go to Account > Keys & Credentials > API keys & tokens. Note your `authToken` that matches the `accountSid` you have defined.

### Mailgun
1. Sign up for account and verify email address
2. Go to Sending > Overview and Select API > Node.js. 
3. Examine example and note `API Key` as well as the sandbox domain name. Top should say something like "How would you like to send your emails from `<your-domain-name>`?" Sandbox should be `sandbox<some-number>.mailgun.org`.

### CircleCI
1. Sign up for an account with your VCS provider.
2. Follow and onboard project.
3. Update serverless endpoints with yours (update the project envars or include in config).
4. Go to Project Settings > Triggers > Add Scheduled Trigger. Create your trigger.

### Packages to install

`twilio`, `mailgun-js`, and `axios`