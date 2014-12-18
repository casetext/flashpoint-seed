flashpoint-seed
===============

A seed project for building an app using Flashpoint.

## Installation

Let's assume you're building a cool new web app, let's call it "Tweetbook."
First, clone the repository from Github and rename the remote to "seed":

```bash
git clone https://github.com/casetext/flashpoint-seed.git tweetbook
cd tweetbook
git remote rename origin seed
```

Then install required dependencies:
 
```bash
npm install -g gulp
npm install
```

Then configure your new project by running:
```bash
gulp init
```

And follow the prompts.


## Updating

In the future we may make changes to the seed repository that you would like to incorporate
(updated dependencies, etc.). To do this, all you have to do is run the following command:

```bash
git pull seed master
```

The seed will almost never be changed in a way that will provoke conflicts with your code.
If you do happen to encounter a merge conflict, always pick your changes over the seed's.


## Usage

You can always run `gulp help` to get a list of gulp tasks you can run.

### gulp app

Rebuild the application assets (i.e., your code, not vendor libraries). Unless you have written a *lot* of
code, this should be substantially faster than `gulp build`.

### gulp assets

Copies everything in the `assets` directory into `build/static/assets`.

### gulp build

Rebuilds all the things (i.e., runs `gulp app`, `gulp assets`, and `gulp vendor`).

### gulp dev

This command updates Bower, compiles your code, and stands up a livereloading development web server at
`127.0.0.1:3000`. If you change any code, it reruns the tests and reloads any connected web browsers
with the new code.

It's also the default Gulp task, so you can just run `gulp` instead.

### gulp help

List out all available commands and short descriptions of them.

### gulp init

Initialize the seed with your project information. This should be the first thing you run.

### gulp lint

Lints all Javascript in the project to check for errors. There are three `.jshintrc` files in the repo:
 - `./.jshintrc`
 - `./src/.jshintrc`
 - `./test/.jshintrc`

The two latter .rc files extend the first, so your lint rules adhere to DRY (Don't Repeat Yourself).

### gulp populate

Overwrites your Firebase (i.e., the one in FIREBASE_URL) with the data in `firebase/populate`.

See [firebase/README.md](firebase/README.md) for more information.

### gulp rules

Builds and sends the Firebase rules specified in `firebase/rules` to your Firebase (i.e., the one in FIREBASE_URL).
The results of the build will also be available for inspection at `build/rules.json`.

See [firebase/README.md](firebase/README.md) for more information.

### gulp test

Run all tests, that is, unit, security, and end-to-end.

### gulp test:end-to-end

Run the end-to-end tests. You can specify an individual spec to run
with the environment variable ONLY, i.e., `ONLY=example gulp test:end-to-end`.

### gulp test:security

Run the security tests. You can specify an individual security test to run with the
environment variable ONLY, i.e., `ONLY=users gulp test:security`.

### gulp test:unit

Run the unit tests. You can specify an individual unit to run with the environment variable ONLY,
i.e., `ONLY=directives/fancy-directive gulp test:unit`.

### gulp vendor

Build the vendored assets, i.e., libraries that you import from Bower and NPM.


## More Docs

- [Testing](test/README.md)
- [Firebase](firebase/README.md)
