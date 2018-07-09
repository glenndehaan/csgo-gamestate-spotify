import {h, Component} from 'preact';

export default class TimeDate extends Component {
    constructor() {
        super();

        const now = new Date();
        this.state = {
            time: `${this.fixTimeDateDisplay(now.getHours())}:${this.fixTimeDateDisplay(now.getMinutes())}:${this.fixTimeDateDisplay(now.getSeconds())}`,
            date: `${this.getDay(now.getDay())} ${this.fixTimeDateDisplay(now.getDate())}-${this.fixTimeDateDisplay(now.getMonth())}-${now.getFullYear()}`
        };
    }

    /**
     * Function that runs when the component gets mounted
     */
    componentDidMount() {
        requestAnimationFrame(() => this.updateTimeDate());
    }

    /**
     * Updates the Time and Date in a window.requestAnimationFrame function
     */
    updateTimeDate() {
        const now = new Date();
        this.setState({
            time: `${this.fixTimeDateDisplay(now.getHours())}:${this.fixTimeDateDisplay(now.getMinutes())}:${this.fixTimeDateDisplay(now.getSeconds())}`,
            date: `${this.getDay(now.getDay())} ${this.fixTimeDateDisplay(now.getDate())}-${this.fixTimeDateDisplay(now.getMonth())}-${now.getFullYear()}`
        });

        requestAnimationFrame(() => this.updateTimeDate());
    }

    /**
     * Helper function to prepend a 0 if needed
     */
    fixTimeDateDisplay(value) {
        if(value <= 9) {
            return `0${value}`
        } else {
            return value;
        }
    }

    /**
     * Helper function to return the day in text
     */
    getDay(value) {
        if(value === 1) {
            return "Monday";
        }

        if(value === 2) {
            return "Tuesday";
        }

        if(value === 3) {
            return "Wednesday";
        }

        if(value === 4) {
            return "Thursday";
        }

        if(value === 5) {
            return "Friday";
        }

        if(value === 1) {
            return "Saturday";
        }

        return "Sunday";
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="time-date" className="block">
                <img src="../images/clock-logo.png" />
                <div>
                    <h2>{this.state.date}</h2>
                    <h3>{this.state.time}</h3>
                </div>
            </div>
        );
    }
}
