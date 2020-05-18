# Spotify cli

NOTE: Only works with osx (mac)<br>

## To use:

Install the package globally<br>

```
npm i -g @hypedis/spotcli
```

use the `spotcli` command to use the CLI <br>

Example:<br>

```
# to reduce the volume<br>
spotcli vol down

# get artist info for currently playing track
spotcli show artist
```

## Commands:

\<\> = required<br>
[] = optional<br>

`show` \<artist, album, stats, uri\> Show info on currenty playing track.<br>
`play` [URI] Resume playback<br>
`pause` Toggle between play/pause.<br>
`quit` Quit Spotify<br>
`next` Go to the next track<br>
`prev` Go to the previous track<br>
`replay` Replay current track<br>
`pos <position>` Move to a specific position in a song (given in seconds)<br>
`ff <seconds>` Fast forward by a given amount of seconds<br>
`rw <seconds>` Rewind by a given amount of seconds<br>
`vol <position>` Move the volume slider to the desired position. Range: integer [0, 100]<br>
`vol up` Increases volume by 10%<br>
`vol down` Decreases volume by 10%<br>
`help [command]` display help for command<br>
