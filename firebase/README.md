
## Developing against Firebase

### populate

The "populate" directory contains JSON files that you can use to preload content
into your Firebase. This is useful for testing and making sure that you can always
have a consistent state for your database during development (i.e., a "reset" button).

A file called "demo.json" will be loaded in your Firebase at `/demo`. If "demo.json"
contains an object with three keys, "foo," "bar," and "baz," those keys will be
accessible at `/demo/foo`, `/demo/bar`, and `/demo/baz`.

Use the `gulp populate` task to send your predefined data to Firebase.

### rules

The "rules" directory contains JSON files that you can use to set up your Firebase rules.
Like "populate", it is constructed using file paths and keys underneath those
file paths.

If you put rules in "demo.json", those rules will apply to your Firebase at "/demo".
If you put rules in "demo/foo.json", those rules will apply to your Firebase at "/demo/foo".

Use the `gulp rules` task to send your rules to Firebase.

## Deploying to Firebase Hosting

Firebase provides a fast and reliable [hosting service](https://www.firebase.com/docs/hosting/quickstart.html) for your static assets.

To send your application to your Firebase for hosting, first you need to install
the Firebase tools:

```bash
npm install -g firebase-tools
```

Now any time you want to deploy you can run:

```bash
firebase deploy
```
