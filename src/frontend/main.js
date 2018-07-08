import {h, Component, render} from 'preact';
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
                <CSGO/>
                <SpotifyInfo/>
            </div>
        );
    }
}

render(<App/>, document.body);
