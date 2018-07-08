import {h, Component} from 'preact';

export default class SpotifyInfo extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            artist: ""
        };
    }

    /**
     *
     */
    componentDidMount() {
        console.log('here1');
        window.spotifyHelper.player.on('ready', () => {
            window.spotifyHelper.player.on('track-will-change', track => {
                this.setState({
                    title: track.track_resource.name,
                    artist: track.artist_resource.name
                });
            });

            this.setState({
                title: window.spotifyHelper.status.track.track_resource.name,
                artist: window.spotifyHelper.status.track.artist_resource.name
            });
            console.log('window.spotifyHelper.status', window.spotifyHelper.status);
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h2>{this.state.artist}</h2>
            </div>
        );
    }
}
