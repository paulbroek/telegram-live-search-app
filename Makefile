include .env
export

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

