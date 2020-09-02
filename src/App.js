import React, { Component, Suspense } from "react"
import { Link, Route } from "react-router-dom"
import Users from "./containers/Users/Users"
import Pizza from "./containers/Pizza/Pizza"

// const Pizza = React.lazy(() => import("./containers/Pizza/Pizza"))

class App extends Component {
    render() {
        return (
            <div>
            <div>
                <Link to="/">Users</Link> |
                <Link to="/pizza">Pizza</Link>
            </div>
            <div>
                <Route path="/" exact component={Users} />
                {/* <Route exact path="pizza"
                    render={() => <Suspense>
                        <Pizza />
                    </Suspense>} /> */}

                <Route path="/pizza" component={Pizza} />
            </div>
        </div >
        )
    }
}

export default App
