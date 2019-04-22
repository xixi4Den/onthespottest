# OnTheSpotTest

Test tasks for On The Spot Development.

### Task 1

Implement the logic for a vending machine that will return the optimal change for a given number of Euro assuming an unlimited supply of coins. It should return the least number of coins possible.

### Task 2

Implement a method to get the change for a given number of Euro based on a limited supply of coins. It should return the least number of coins possible as long as they are available in the inventory.

### Notes

* `task1` folder contains source code for **Task 1**. Also some code from `task1/lib` was reused for **Task 2** as requested by requirements.
* `task2` folder contains source code for **Task 2**. **Task 2** was implemented using classes because this logic is statefull.
* `demo-cli` serves presentation purposes only. It was developed in quite short terms and wasn't covered by unit tests. So please accept it as it is.
* `environment.js` incaplulates all manipulations with environment variables so that environment variables are not spread out across all source code.
* I decided that it makes sense to limit upper input value regardless this point wasn't mentioned in requirements for tasks. Default limit is 500 Euro as it's max Euro banknote. But you can override this value by `MAX_ALLOWED_EURO` environment variable.
* An initial configuration for the inventory provided in the task description was hardcoded in `environment.js`, but not in business code.
* An initial configuration for the inventory can be overriden by `INVENTORY_CONFIG_<denomination>` environment variables (for example `INVENTORY_CONFIG_100`, `INVENTORY_CONFIG_50` and etc)
* An initial configuration for the inventory can be set via `demo-cli` as well. But these steps can be skipped (default config values will be used)

## Prerequisites

```
nodejs v11.10.1
npm v6.7.0
```

## Installation

Install required npm packages

```
npm install
```

## Usage

Run `demo-cli` that is intended to demonstrate the test task. Just run it and follow instructions.

```
npm start
```

## Running tests

Run coding style tests and unit tests

```
npm test
```

Run unit tests and calculate coverage

```
npm run test:coverage
```
