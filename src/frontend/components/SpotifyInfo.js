import {h, Component} from 'preact';
import SpotifyControls from './SpotifyControls';

export default class SpotifyInfo extends Component {
    constructor() {
        super();

        this.state = {
            isPlaying: false,
            title: "",
            artist: ""
        };
    }

    /**
     * Function that runs when the component gets mounted
     */
    componentDidMount() {
        window.spotifyHelper.player.on('ready', () => {
            window.spotifyHelper.player.on('track-will-change', track => {
                this.setState({
                    title: track.track_resource.name,
                    artist: track.artist_resource.name
                });
            });

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
                isPlaying: window.spotifyHelper.status.playing,
                title: window.spotifyHelper.status.track.track_resource.name,
                artist: window.spotifyHelper.status.track.artist_resource.name
            });
        });
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="spotify-info" className={this.state.isPlaying ? 'is-playing' : ''}>
                <img src="../images/spotify-logo.png"/>
                <div id="info">
                    <h2>{this.state.title}</h2>
                    <h3>{this.state.artist}</h3>
                </div>
                <SpotifyControls/>
            </div>
        );
    }
}
