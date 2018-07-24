import {h, Component} from 'preact';

export default class Message extends Component {
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
            <div id="message" className="block">
                <h3>
                    Due to recent changes in the Spotify app we cannot read the status of the player anymore.<br/>
                    NOTE: Make sure that Spotify is paused before you start this app<br/>
                    This message will disappear within 10 seconds.
                </h3>
            </div>
        );
    }
}
