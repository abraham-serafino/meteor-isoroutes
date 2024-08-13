import CounterPage from "./Counter/Counter.page"
import CharacterPage from "./Character/Character.page"
import AppPage from "./App.page";

function AppRoutes(app) {
    AppPage(app)
    CounterPage(app)
    CharacterPage(app)
}

export default AppRoutes
