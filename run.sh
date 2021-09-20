# launch docker


docker run -it -v /home/dppa1008/money-bot/data:/app/data \
	-v /home/dppa1008/.ngrok2:/root/.ngrok2/ \
	-p 5000:5000 \
	money-bot
