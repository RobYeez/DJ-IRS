# Music Sharing
The FM Music Player is a music-sharing mobile application where two or more users can listen to the same song and view the corresponding music visuals. 

## Documentation
[User Stories](https://docs.google.com/document/d/1wzlLbw7m6ggItiiTl4VYiQNSGIIzgpAHu4oyI8SCSow/edit?usp=sharing)
### Sprint 2 User Stories to Demo
* Sharing new music: As a user, I would like to share music between my friends.
* Syncing - As a user with friends, I would like to sync my current song to what they are listening to (essentially streaming the music to them in real time).
* Group Queue - As a user that listens with friends often, my friends and I often want to play different songs without interrupting what is currently playing.


[Scrum Template](https://docs.google.com/spreadsheets/d/1nhRw-kVF4KX5-mIonh-vHwY4g8o0PF9JAonYF4kTRXc/edit?usp=sharing)

## Install 
mongodb,
express,
react,
nodejs

## To set up server
Start mongodb:

	sudo service mongod start

verify:

	sudo service mongod status

Start mongo shell:

	mongo 

Inside mongo shell:

	use dj-irs_admin


stop mongodb:

	sudo systemctl stop mongod.service

look here for more 
https://docs.mongodb.com/manual/mongo/

## To start our server

use a sepreate terminal
cd into/src

	npm run dev
