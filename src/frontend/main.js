import {h, Component, render} from 'preact';
import TimeDate from './components/TimeDate';
import CSGO from './components/CSGO';

class App extends Component {
    constructor() {
        super();
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="root">
                <TimeDate/>
                <CSGO/>
            </div>
        );
    }
}

render(<App/>, document.body);
