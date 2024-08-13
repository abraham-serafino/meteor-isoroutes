import { onPageLoad } from 'meteor/server-render'
import { renderToString } from "react-dom/server"
import React from "react"
import Layout from "/imports/App/Layout"
import AppRoutes from "/imports/App/App.routes"
import "/imports/App/AppState.model"
import {AppState} from "/imports/App/AppState.model";
import UrlPattern from "url-pattern";

onPageLoad((sink) => {
    function render(Component, pageData) {
        const layoutData = AppState.find().fetch()[0]

        const preloadedState = {
            layoutData,
            ...pageData
        }

        sink.renderIntoElementById(
            "react-target",
            renderToString(<Layout {...layoutData}><Component {...pageData} /></Layout>)
        )

        sink.appendToBody(`
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
            </script>
          `)
    }

    AppRoutes({
        get(url, cb) {
            if ((new UrlPattern(url)).match(sink?.request?.path)) {
                cb(sink?.request, { render })
            }
        }
    })
})
