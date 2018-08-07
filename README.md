# Everipedia Demux Sync

This repo contains code for syncing Everipedia on-chain state to an off-chain MySQL database using [demux](https://github.com/EOSIO/demux-js/).

Some of the code used in this repo is experimental and comes from the Everipedia [fork](https://github.com/EveripediaNetwork/demux-js/) of demux. The fork contains a pull request that will be merged into the main repo soon. Once that is complete, the code will revert to using the main EOSIO demux repo. 

This is currently the only working implementation of the MysqlActionHandler functionality. Hit us up on the Everipedia Developers Telegram [chat](https://t.me/epdevelopers) if you have questions. 
