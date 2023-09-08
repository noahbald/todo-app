# Broadsheet Todo Task Runbook
## Stack
- **Remix**: A React metaframework, similar to NextJS but not as opinionated. This makes it easier to use custom tooling like Express.
- **Express**: Express is a node based server framework for creating APIs
- **PlanetScale**: Planetscale is a serverless MySQL database
## Getting Started
### Local Development
Run the following commands to install the project
```sh
nvm use 18.16.0
npm install
```

To run the project locally, run the following command
```sh
npm run dev
```

This will run the app on a local development server, [localhost:3000](http://localhost:3000) by default. This will also run the express server.
### Database Setup
To setup a fresh database, you can follow planetscale's [quick start guide](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide). After which, you can run the following commands to get the required tables set up.
```mysql
CREATE TABLE `todos` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1023) NOT NULL,
	`priority` enum('low', 'medium', 'high') NOT NULL,
	`deadline` date NOT NULL,
	`status` enum('In progress', 'Completed'),
	PRIMARY KEY (`id`)
);

CREATE TABLE `notes` (
	`id` int NOT NULL AUTO_INCREMENT,
	`todo_id` varchar(36) NOT NULL,
	`note` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);
```

To connect to this database from your local development and create a `.env` file, adding the following variable.
```.env
DATABASE_URL='mysql://<username>:<password>@aws.connect.psdb.cloud/<database-name>?ssl={"rejectUnauthorized":true}'

```

If you need, you can create a new username and password in the "settings" tab of your planetscale database.

### Testing
Run the following to perform unit tests.
```sh
npm run test
```

Note that these tests are not expensive, as I have a busy weekend.
