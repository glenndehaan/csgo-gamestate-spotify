# Counter-Strike Global Offensive Game State Spotify

Want to hear you CS sounds but also listen to music. This is the answer.
After you died in CS we start playing music from spotify until you need to play.

## Structure
- ES6
- NodeJS
- Spotify Web Helper
- Simple Node Logger

## Usage
- Install NodeJS 8.0 or higher
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `Steam\SteamApps\common\Counter-Strike Global Offensive\csgo\cfg` folder
- Open up Spotify
- Run `npm install` in the node folder
- Run `npm run server` in the node folder

Then open up CS::GO and start playing after you died we will play your music from Spotify.

## Logging
All logs will be written to the `csgo-gamestate-spotify.log` file in the node folder.

## TODO
- Operation mode 2 implement fadein / fadeout
- Create installer for windows to create start shortcuts
- Better manual?

## License

MIT
