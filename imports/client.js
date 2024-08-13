import React from 'react'
import { createRoot } from 'react-dom/client'
import { onPageLoad } from "meteor/server-render"
import express from "browser-express"
import Layout from '/imports/App/Layout'
import AppRoutes from "/imports/App/App.routes"

onPageLoad(() => {
  const preloadedState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  const {
    layoutData = {},
    ...pageData
  } = preloadedState || {}

  const container = document.getElementById('react-target')
  const root = createRoot(container)

  const app = express()

  app.use((req, resp, next) => {
    resp.render = (Component) => {
      root.render(<Layout {...layoutData}><Component {...pageData} /></Layout>)
    }

    next()
  })

  AppRoutes(app)

  app.listen({}, () => {})
})
