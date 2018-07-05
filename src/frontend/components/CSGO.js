import {h, Component} from 'preact';

export default class extends Component {
    constructor() {
        super();

        this.state = {
            data: false
        };

        this.server = false;
        this.spotifyReady = false;
        this.isPlaying = false;
    }

    componentDidMount() {
        this.server = window.httpServer.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'});

            req.on('data', (data) => {
                try {
                    this.setState({
                        data: JSON.parse(data.toString())
                    });
                    this.generalProcessData(JSON.parse(data.toString()));
                } catch (e) {
                    console.warn(`[WEBDATA] Error retrieving data from API: ${e}`)
                }
            });

            req.on('end', () => {
                res.end('');
            });
        });

        this.server.listen("3001", "0.0.0.0");

        window.spotifyHelper.player.on('ready', () => {
            this.spotifyReady = true;
        });
    }

    generalProcessData(data) {
        if (!data.previously && !data.player) return;

        if ((data.player && data.player.activity === 'menu') || (data.player.state.health === 0 || data.player.steamid !== data.provider.steamid) || (data.round && data.round.phase !== "live")) {
            // Let's play some music
            if (this.spotifyReady) {
                if (!this.isPlaying) {
                    console.log(`[CS::GO] Let's start some music`);
                    window.spotifyHelper.player.play();
                    this.isPlaying = true;
                }
            } else {
                console.warn(`[SPOTIFY] Isn't ready to handle requests`);
            }
        } else {
            // Let's be serious so quit the music
            if (this.spotifyReady) {
                if (this.isPlaying) {
                    console.log(`[CS::GO] Stop the music`);
                    window.spotifyHelper.player.pause();
                    this.isPlaying = false;
                }
            } else {
                console.warn(`[SPOTIFY] Isn't ready to handle requests`);
            }
        }
    }

    render() {
        return (
            <div>
                CSGO component:<br/>
                {this.state.data ? JSON.stringify(this.state.data) : false}
            </div>
        );
    }
}
