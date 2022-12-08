# Shared document editor

Shared document editor is an online text editor that can be edited by multiple people. Create and edit text documents in your browser—no dedicated software is required. Teammates can work on a single document simultaneously; every change is saved automatically.

The server is a NodeJS script that uses Socket.IO to handle the user events and store them in MongoDB.The client is React application that uses Quill as a rich text editor.

Shared document editor can use login with google authentication and share document link to other users on the webpage with Gmail API. The document creator can set different accessions like share, edit or view for other users. This app can realize title search and article content search.

# Team

- [Tank-Sun](https://github.com/Tank-Sun)
- [onaroll2021](https://github.com/onaroll2021)
- [lining04111223](https://github.com/lining04111223)

# Stack:

## Front-end:

- [React](https://reactjs.org/)
- [react-router-dom](https://reactrouter.com/en/main)
- [quill](https://quilljs.com/)
- [Axios](https://github.com/axios/axios)
- [tailwindcss](https://tailwindcss.com/)

## Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [socket.io](https://socket.io/)
- [google-cloud/local-auth](https://github.com/googleapis/google-auth-library-nodejs)
- [passport](https://www.passportjs.org/)

## Database

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-ca_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624311&adgroup=115749704343&gclid=Cj0KCQiAkMGcBhCSARIsAIW6d0DkzDbpnEfgnypas8H7_vE09O79pLDQ4Aaux3Yp3Gw989e0TraTQgcaAnK3EALw_wcB)
- [mongoose](https://mongoosejs.com/)

# Screenshots

### Component Flow of the App

![Component Flow](https://github.com/lining04111223/scheduler/blob/master/docs/scheduler_flow_chart.png?raw=true)

### Main View

![Screenshot 1](https://github.com/lining04111223/scheduler/blob/master/docs/main_menu.png?raw=true)

### Different Mode

![Screenshot 2](https://github.com/lining04111223/scheduler/blob/master/docs/different_mode.png?raw=true)

### Error Status

![Screenshot 3](https://github.com/lining04111223/scheduler/blob/master/docs/error.png?raw=true)

### Storybook

![Screenshot 4](https://github.com/lining04111223/scheduler/blob/master/docs/storybook.png?raw=true)

# Setup Instructions:

## Setup

```sh
Install dependencies with `npm install`.
```

## Running Webpack Development Server

```sh
npm start
```

## Running Server

```sh
npm start devStart
```
