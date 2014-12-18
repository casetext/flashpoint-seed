
## Testing in flashpoint-seed

flashpoint-seed includes all the machinery you need to test your application
from three different perspectives:

- *Unit tests*, which exercise Angular components to ensure they work the
way you expect them to;
- *Security tests*, which ensure your Firebase security rules allow and deny
access the way you expect them to; and
- *End-to-end tests*, which ensure that your Web application looks and behaves
the way your users expect it to.


### Unit tests

In Angular, unit tests exercise individual code components like 
controllers, services, filters, and directives. They supply a broad range of inputs
and evaluate the behavior and state of the system given those inputs.

Good unit tests operate on a single source file or Angular component at a time.
They isolate themselves from dependencies not under test: that is, they
mock out external resources and avoid accessing the network.

Here are some kinds of questions your unit tests can answer:
- "When 'scope.loggedIn' is false, does the "editor" directive allow input to its textarea?"
- "If I call 'SimulatorCtrl#run()' without supplying an argument, does it throw an error?"
- "Does the 'slugify' filter remove spaces and convert uppercase to lowercase?"

The tests that answer these questions might look like the following:
```js
inject(function($rootScope, $compile) {
  
  $rootScope.loggedIn = false;
  var directiveEl = $compile('<editor></editor>')($rootScope);
  $rootScope.$digest();
  expect(directiveEl.find('textarea')[0].disabled).to.be.true;

});
```

```js
inject(function($rootScope, $controller) {
  
  var simulator = $controller('SimulatorCtrl', { $scope: $rootScope });

  expect(function() {
    simulator.run();
  }).to.throw();

  expect(function() {
    simulator.run('y = x + 1');
  }).not.to.throw();

});
```

```js
inject(function($filter) {
  
  var slugifyFilter = $filter('slugify');
  expect(slugifyFilter('Something to slugify.')).to.equal('something-to-slugify');

});
```

This seed project uses [karma](http://karma-runner.github.io/0.12/index.html) to
read your application's Javascript sources and Jade templates, then run tests against those sources.

For more complete instructions on how to unit test Angular applications, read [the
Angular.js documentation on unit testing.](https://code.angularjs.org/1.3.9/docs/guide/unit-testing)


### Security tests

If you need an introduction to what Firebase security rules are and why they're
important, go [here.](https://www.firebase.com/docs/security/guide/understanding-security.html)

For security tests in this seed project,
[targaryen.js](https://github.com/goldibex/targaryen) reads your rules.json file in,
then runs tests you write against those rules.

Your tests should describe in plain language
- **who** you expect to be able to read and write
- **what kind of data** at
- **which** locations in Firebase.

Once you've laid out that description, you can write security rules that fulfill
your needs. 

You should think of your tests as **deductive**. They make sure that your rules
are correct by ensuring they they allow certain users to do some things and not others.
In other words, your tests describe the scenarios
you **have** anticipated, and as you discover the ones you **haven't**, you'll
add tests for them.

Here are some kinds of questions your security tests can answer:
 - "Can unauthenticated users read objects in /files?"
 - "Can a user write to /posts if her profile in /users isn't marked 'approved'?"
 - "Can a user write to /posts if they don't include a title?"

 The tests that answer these questions might look like the following:
 ```js
 expect(users.unauthenticated).cannot.read.path('files/some-file');
 ```

```js
 targaryen.setFirebaseData({
   users: {
     'new-user': {
       approved: false
     }
   }
 });

expect({ uid: "new-user" }).cannot.write.to.path('posts/new-post');
```
 
```js
 expect({ uid: "approved-user" })
 .can.write({ title: 'New Title'})
 .to.path('posts/new-post');
 
 expect({ uid: "approved-user" })
 .cannot.write({ empty: true })
 .to.path('posts/new-post');
```

For more information on security testing, read
[the Targaryen docs.](https://github.com/goldibex/targaryen/blob/master/USAGE.md)


### End-to-end tests

End-to-end tests verify the behavior of your system from the perspective of a user.
They are sometimes called "acceptance" or "release" tests because in the
old days they were the last step in approving software for release.

For a Web application, an end-to-end test is a script that drives a Web browser
like a [player piano](http://en.wikipedia.org/wiki/Player_piano),
clicking on user interface elements and examining their text and other state.

[Protractor](http://angular.github.io/protractor) is the tool used here to perform end-to-end tests.

Here are some kinds of questions about your end-to-end tests can answer:
 - "Does clicking on the 'about' link send the browser to the About page?"
 - "If I add a piece of jewelry on the Showcase page, does it also appear in the online store?"
 - "When I log in for the first time, am I prompted to fill out my user profile?"

A test that answers the first question might look like the following:

```js
return browser.get('/')
.then(function() {
  return element(by.id('about')).click();
})
.then(function() {
  return expect(browser.getCurrentUrl()).to.eventually.equal('/about');
});
```

For more information on end-to-end testing, read [the Angular docs on end-to-end testing](https://docs.angularjs.org/guide/e2e-testing)
and [the Protractor tutorial](http://angular.github.io/protractor/#/tutorial).
