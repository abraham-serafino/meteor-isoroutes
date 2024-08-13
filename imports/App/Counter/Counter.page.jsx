import React, { useEffect, useState } from "react"
import AppStateModel, {AppState} from "/imports/App/AppState.model"
import {WebApp} from "meteor/webapp";

export function Counter ({ count: originalCount = 0 }) {
    const [isLoading, countData] = AppStateModel.subscribe()
    const [count, setCount] = useState(originalCount)

    useEffect(() => {
        if (!isLoading && countData) {
            setCount(countData.count)
        }
    }, [isLoading, countData])

    const handleIncrementCount = () => {
        const newCount = count + 1

        setCount(newCount)
        AppStateModel.incrementCount({})
    }

    return (
        <>
            <p>You've pressed the button {count} times.</p>
            <button onClick={() => {
                handleIncrementCount()
            }}>Click Me</button>
        </>
    )
}

function CounterPage(app) {
    app.get("/counter", (_, resp) => {
        const count = AppState.find().fetch()[0]?.count || 0
        resp.render(Counter, { count })
    })
}

export default CounterPage
