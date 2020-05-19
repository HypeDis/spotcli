# Spotify cli

Nodejs based Spotify command line interface heavily inspired by
https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/osx/spotify<br>
NOTE: Only works with osx (mac)<br>

## To use:

Install the package globally<br>

```
npm i -g @hypedis/spotcli
```

use the `spotcli` command to use the CLI <br>

Example:<br>

```
# reduce the volume<br>
spotcli vol down

# get artist info for currently playing track
spotcli show artist
```

## Commands:

\<\> = required<br>
[] = optional<br>

`show` \<artist|album|stats|uri\> Show info on the currenty playing track.<br>
`play` [artist|track|album|list|uri] Resume playback or play a specific artist, track, album, playlist, or uri<br>
`pause` Toggle between play/pause<br>
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
`toggle <shuffle|repeat>` Toggle shuffle/repeat on and off
`register` spotcli will prompt you to enter your clientId and clientSecret
`help [command]` display help for command<br>

## Aliases for bash/zsh (optional):

```
alias sshow="spotcli show"
alias sshowar="spotcli show artist"
alias sshowal="spotcli show album"
alias sshowst="spotcli show stats"
alias sshowur="spotcli show uri"
alias spl="spotcli play"
alias splar="spotcli play artist"
alias splal="spotcli play album"
alias spltr="spotcli play track"
alias splli="spotcli play list"
alias splur="spotcli play uri"
alias spau="spotcli pause"
alias squit="spotcli quit"
alias snxt="spotcli next"
alias sprev="spotcli prev"
alias srep="spotcli replay"
alias spos="spotcli pos"
alias sff="spotcli ff"
alias srw="spotcli rw"
alias sv="spotcli vol"
alias svd="spotcli vol down"
alias svu="spotcli vol up"
alias sts="spotcli toggle shuffle"
alias str="spotcli toggle repeat"
```
