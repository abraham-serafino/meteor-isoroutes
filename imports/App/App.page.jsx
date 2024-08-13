import React, { useEffect, useState } from "react"
import AppStateModel, {AppState} from "/imports/App/AppState.model"

function App() {
    return (
        <></>
    )
}

function AppPage(app) {
    app.get("/", (_, resp) => {
        resp.render(App, {})
    })
}

export default AppPage
