require('dotenv').config()

import express from 'express'
import cors from 'cors'
import next from 'next'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'

import authRoutes from '../routes/auth.routes'
import apiRoutes from '../routes/api'
import User from './database/schema/user.js'

import { isLoggedIn } from './middleware/index'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(async () => {
   const app = express()

   app.use(cors())

  mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cookieParser())

   /*================================
      Passport Configuration
   ================================*/
   app.use(require("express-session")({
      secret: "1234567890qwertyuiopasdfghjklzxcvbnm",
      resave: false,
      saveUninitialized: false
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(User.createStrategy());
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());

   app.use("/", authRoutes);
   app.use("/", apiRoutes);

   app.get('/secret', isLoggedIn , (req, res) => {
      nextApp.render(req, res, '/secret', req.user)
   })

   app.get('/play', isLoggedIn , (req, res) => {
      nextApp.render(req, res, '/play', req.user)
   })

   app.get('/play/challenges', isLoggedIn , (req, res) => {
      nextApp.render(req, res, '/play/challenges', req.user)
   })

   app.get('/pages/:gameId', isLoggedIn , (req, res) => {
      nextApp.render(req, res, `/pages/${gameId}`, {...req.params})
   })

   app.get('*', (req, res) => {
      return handle(req, res)
   })

   app.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on localhost:${port}`)
   })
})
