import {h, Component, render} from 'preact';
import SpotifyInfo from './components/SpotifyInfo';
import SpotifyControls from './components/SpotifyControls';
import CSGO from './components/CSGO';

class App extends Component {
    constructor() {
        super();
    }

    /**
     *
     */
    componentDidMount() {
        console.log('here1');
    }

    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                We are using Node.js {window.process.versions.node},<br/>
                Chromium {window.process.versions.chrome},<br/>
                and Electron {window.process.versions.electron}.<br/>
                <SpotifyInfo/>
                <SpotifyControls/>
                <CSGO/>
            </div>
        );
    }
}

render(<App/>, document.body);
