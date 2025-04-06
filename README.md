# Ask Mistral
This repository provides a simple CLI interface to interact with [Mistral AI](https://mistral.ai/fr)'s flagship model Mistral Large through La Plateforme API.
## Installation
1. Create an account and fenerate an API key on [La Plateforme](https://console.mistral.ai/home).
2. Clone repository
```
git clone https://github.com/jinky77/ask-mistral.git
```
3. Navigate in `ask-mistral` source directory and install dependencies
```
npm install
```
4. Create a new `.env` file at the root of your project directory.
5. In `.env`, declare a new `MISTRAL_API_KEY` variable assign the API key provided from La Plateforme to it.
6. Run the development server
```
npm run dev
```
