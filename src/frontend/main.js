import {h, Component, render} from 'preact';
import TimeDate from './components/TimeDate';
import SpotifyInfo from './components/SpotifyInfo';
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
                <SpotifyInfo/>
            </div>
        );
    }
}

render(<App/>, document.body);
