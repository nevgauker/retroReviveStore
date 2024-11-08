
ecommerce for selling  digital stuff

tech : 

next 14 ,typescript,prisma and tailwind css

include  :  admin page , front store for  users and payment

### Update: now,with charts
https://www.youtube.com/watch?v=15qMh8C1Wzo&t=261s&ab_channel=WebDevSimplified

### Update: this version include a  coupons stsyem
https://www.youtube.com/watch?v=qpApvVd_dCw&ab_channel=WebDevSimplified

## Getting Started

install packages

set  env stuff


DATABASE_URL="file:./dev.db"
This is the  local developmennt  db. use adiffrent one  in production


ADMIN_USERNAME

The admin username /email 


HASHED_ADMIN_PASSWORD

The admin hashed password (base64)



STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY

use your own account. for  production purposes , make sure the account is live


NEXT_PUBLIC_SERVER_URL=http://localhost:3000
update  the  url to where ever the  code is

RESEND_API_KEY
set  your resend account to send email to users


SENDER_EMAIL=onboarding@resend.dev

this is resend  email for  development . update it  for production


STRIPE_WEBHOOK_SECRET


set it uplocally for development . create a diffrent  one for production
for more info stripe webhhoks






## Learn More

Based on : https://www.youtube.com/watch?v=iqrgggs0Qk0&t=1559s&ab_channel=WebDevSimplified



## Deploy on Vercel

