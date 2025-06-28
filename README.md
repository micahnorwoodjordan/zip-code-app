# Zip Code App

- This project hosts a simple web app that runs in browser. I thought about building a small backend to record requests and responses in a database (to show my API-side familiarity), but I don't have time to. This is why I opted for [Docker Compose](#running-the-project) -- I expected multiple services to run in tandem with each other.
- Maybe building this backend could be the next exercise to showcase my API-side familiarity.

## Tech Stack

- Language: TypeScript
- Framework: Angular (20.0.0)
- Runtime: Node (24.0.0)

## Target Platform

- Web browser

## Code Architecture

- I don't like my code to get messy, so I naturally try to deligate tasks to dedicated mebers, modules, services, etc. This is one of the things I lvoe about Angular -- it really encourages you to do just that. A few design patterns come into play here:

### Component-Based

- the project follows a modular, component-based pattern to facilitate reusability.
- each component addresses a very small scope generically enough such that each (except for the `DisplayComponent`) can theoretically be plugged into any other project

### Dependency Injection

- component logic and service logic are very loosely coupled by virtue of encapsulating all service logic within services and injecting them into whichever components need access to the logic.

### Reactive / Observer

- components are able to observe or subscribe to HTTP event streams and perform conditional logic accordingly.
- though the scope of the app is too small for it to necessarily see the advantages of this pattern, the project still follows it. this contrasts to my very first web apps years ago, when i would throw an `await` before every asynchronous method call and make my app hang until it got a response!

## Cloning the Project

- this project is hosted on my personal Github account: <https://github.com/micahnorwoodjordan/zip-code-app>
- to clone the repo over CLI, run the below (it's public, so no auth needed):

~~~bash
git clone https://github.com/micahnorwoodjordan/zip-code-app.git
~~~

## Running the Project

- In hindsight, it was a bold assumption of mine that everyone in 2025 has the Docker engine running on their development machine (I use Docker for almost everything)! To run the project locally within a Compose stack, the most basic invocation is the below:

~~~bash
project_root_dir=""  # wherever you choose to download the project
cd $project_root_dir
docker compose up
~~~

- you could also just run the container as an isolated service (no compose stack)

~~~bash
container_name="client"
project_root_dir=""  # wherever you choose to download the project
cd $project_root_dir
docker compose run --rm --name $container_name --service-ports client
~~~

- lastly, assuming that your host CPU architecuture won't be an issue (I develop on Mac M1), and that you have `Node 24.0.0` and the `Angular CLI 20.0.0` installed, you can run the project directly:

~~~bash
project_root_dir=""  # wherever you choose to download the project
cd $project_root_dir/client/src
ng serve
~~~

## Accessing the Application

- in the project compose file, i direct Node to serve the project over Docker's default network bridge on all network interfaces, so traffic to your host's port 4200 will reach the Docker container's port 4200. just make sure you're not already serving another Node app on 4200, or Docker will complain about it.
- however you choose to run the project, just visit <http://localhost:4200> in your browser and happy zip code searching!
