import {h, Component} from 'preact';

export default class CSGO extends Component {
    constructor() {
        super();

        this.state = {
            matchRunning: false,
            roundRunning: false,
            map: false,
            gameMode: false,
            round: false
        };

        this.server = false;
        this.isPlaying = false;
    }

    /**
     * Function that runs when the component gets mounted
     */
    componentDidMount() {
        this.server = window.httpServer.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'});

            req.on('data', (data) => {
                try {
                    this.generalProcessData(JSON.parse(data.toString()));
                    this.generalSpotifyData(JSON.parse(data.toString()));
                } catch (e) {
                    console.warn(`[WEBDATA] Error retrieving data from API: ${e}`)
                }
            });

            req.on('end', () => {
                res.end('');
            });
        });

        this.server.listen("3001", "0.0.0.0");
    }

    /**
     * Update basic CSGO match details
     *
     * @param data
     */
    generalProcessData(data) {
        /**
         * Update Basic Match Data
         */
        if (typeof data.map !== "undefined") {
            this.backgroundUpdate(data.map.name);

            this.setState({
                matchRunning: true,
                map: data.map.name,
                gameMode: data.map.mode,
                round: (data.map.round + 1)
            });
        }

        /**
         * Update Basic Match Data
         */
        if (data.player && data.player.activity === 'menu' && typeof data.map === "undefined") {
            this.backgroundUpdate('', true);

            this.setState({
                matchRunning: false,
                map: false,
                gameMode: false,
                round: false
            });
        }

        if (typeof data.round !== "undefined") {
            this.setState({
                round: (data.map.round + 1)
            });
        }
    }

    /**
     * Function to update the Spotify state based on the CSGO GameState
     *
     * @param data
     */
    generalSpotifyData(data) {
        if (!data.previously && !data.player) return;

        if ((data.player && data.player.activity === 'menu') || (data.player.state.health === 0 || data.player.steamid !== data.provider.steamid) || (data.round && data.round.phase !== "live")) {
            // Let's play some music
            if (!this.isPlaying) {
                console.log(`[CS::GO] Let's start some music`);
                window.robotJS.keyTap("audio_play");
                this.isPlaying = true;

                this.setState({
                    roundRunning: false
                });
            }
        } else {
            // Let's be serious so quit the music
            if (this.isPlaying) {
                console.log(`[CS::GO] Stop the music`);
                window.robotJS.keyTap("audio_pause");
                this.isPlaying = false;

                this.setState({
                    roundRunning: true
                });
            }
        }
    }

    /**
     * Updates the background image to the current played map
     *
     * @param map
     * @param reset
     */
    backgroundUpdate(map = '', reset = false) {
        if (reset) {
            document.body.style.backgroundImage = `url('../images/background.jpg')`;
            return;
        }

        document.body.style.backgroundImage = `url('../images/maps/${map}.jpg')`;
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="csgo" className="block">
                <img src="../images/csgo-logo.png"/>
                <div>
                    <h3>{this.state.matchRunning ? 'Match running' : 'Waiting for match to start'}</h3>
                    {this.state.matchRunning &&
                        <span>
                            Map: {this.state.map}<br/>
                            Round: {this.state.round}<br/>
                            Game Mode: {this.state.gameMode}<br/>
                            Round Live: {this.state.roundRunning ? 'Yes' : 'No, Time for a break'}
                        </span>
                    }
                </div>
            </div>
        );
    }
}
