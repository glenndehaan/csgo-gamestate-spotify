import {h, Component} from 'preact';

export default class extends Component {
    constructor() {
        super();

        this.state = {
            data: false
        };
        this.server = false;
    }

    /**
     *
     */
    componentDidMount() {
        this.server = window.httpServer.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'});

            req.on('data', (data) => {
                try {
                    this.setState({
                        data: JSON.parse(data.toString())
                    });
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

    render() {
        return (
            <div>
                CSGO component:<br/>
                {this.state.data ? JSON.stringify(this.state.data) : false}
            </div>
        );
    }
}
