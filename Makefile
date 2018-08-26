build:
	docker build -t fedemaidan/web_multiml .

start:
	 docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm fedemaidan/web_multiml
compile:
	 docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 fedemaidan/web_multiml