include .env
export
REPO_NAME=telegram-live-search-app

## run react app
.PHONY: run
run:
	npm start

## create ngrok tunnel
.PHONY: tunnel
tunnel:
	ngrok http ${REACT_APP_PORT} --log=stdout > /tmp/ngrok.log &
	tail -n 5 /tmp/ngrok.log

## show ngrok url
.PHONY: url
url:
	cat /tmp/ngrok.log | egrep --text -o 'https.+'


## sync .env file with server
.PHONY: env
env:
	rsync -avz --progress 			\
		~/repos/$(REPO_NAME)/.env 	\
		-e "ssh -p ${SSH_PORT}" paul@${REACT_APP_HOST_GLOBAL}:/home/paul/repos/$(REPO_NAME)/.env

## sync server .env file with local file
.PHONY: envhere
envhere:
	rsync -avz --progress 			\
		-e "ssh -p ${SSH_PORT}" paul@${REACT_APP_HOST_GLOBAL}:/home/paul/repos/$(REPO_NAME)/.env \
		~/repos/$(REPO_NAME)/.env

