import {h, Component, render} from 'preact';
import TimeDate from './components/TimeDate';
import CSGO from './components/CSGO';
import Message from './components/Message';

class App extends Component {
    constructor() {
        super();

        this.state = {
            message: true
        }
    }

    /**
     * Function that runs when the component gets mounted
     */
    componentDidMount() {
        // Hide message
        setTimeout(() => {
            this.setState({
                message: false
            })
        }, 10000);
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        if(this.state.message) {
            return (
                <div id="root">
                    <Message/>
                </div>
            );
        } else {
            return (
                <div id="root">
                    <TimeDate/>
                    <CSGO/>
                </div>
            );
        }
    }
}

render(<App/>, document.body);
