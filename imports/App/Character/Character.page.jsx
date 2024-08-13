import React, { useEffect, useState } from "react"
import AppStateModel, { AppState } from "/imports/App/AppState.model"

function Character({ sex: originalSex = "m" }) {
    const [isLoading, sexData] = AppStateModel.subscribe()
    const [sex, setSex] = useState(originalSex)

    useEffect(() => {
        if (!isLoading && sexData) {
            setSex(sexData.sex)
        }
    }, [isLoading, sexData])

    const handleChangeSex = () => {
        const newSex = sex === 'm' ? 'f' : 'm'

        setSex(newSex)
        AppStateModel.changeSex({ sex: newSex })
    }

    return (
        <>
            <p>Our main character is {sex === "m" ? "MALE" : "FEMALE"}.</p>
            <button onClick={handleChangeSex}>Change</button>
        </>
    )
}

function CharacterPage(app) {
    app.get("/character", (_, resp) => {
        const sex = AppState.find().fetch()[0]?.sex || 'm'
        resp.render(Character, { sex })
    })
}

export default CharacterPage
