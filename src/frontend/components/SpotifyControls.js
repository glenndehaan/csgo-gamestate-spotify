import {h, Component} from 'preact';

export default class SpotifyControls extends Component {
    constructor() {
        super();

        this.state = {
            isPlaying: false
        };
    }

    /**
     *
     */
    componentDidMount() {
        window.spotifyHelper.player.on('ready', () => {
            window.spotifyHelper.player.on('play', () => {
                this.setState({
                    isPlaying: true
                });
            });

            window.spotifyHelper.player.on('pause', () => {
                this.setState({
                    isPlaying: false
                });
            });

            this.setState({
                isPlaying: window.spotifyHelper.status.playing
            });
        });
    }

    render() {
        return (
            <div>
                <button disabled={this.state.isPlaying} onClick={() => window.spotifyHelper.player.play()}>Play</button>
                <button disabled={!this.state.isPlaying} onClick={() => window.spotifyHelper.player.pause()}>Pause</button>
            </div>
        );
    }
}
