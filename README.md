# Blinx Test

it is platform for item search and dashboard display

## Setup
1. clone repo
2. ensure docker installed
3. run `npm i`
4. run `docker-compose up`
5. when Postgre DB started at docker run `npm run migration`
5. clone `.env.example` as `.env`
6. load `.env` (depends on your practice)
6. run `npm run seed`
7. run `npm run start`
8. access platform by [http://localhost:3333](http://localhost:3333)

### Frontend

frontend render by server initially and load script bundled by webpack

### Backend

backend support adonis. please head on `/app` for detail

### TODO
1. build webapp using docker
2. higher test coverage
3. better handle on route system