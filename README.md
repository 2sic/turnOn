# turnOn JavaScript Boot Helper

This small JS library helps you to boot JS with dynamic loading JavaScripts _and_ HTML. It assists in loading these and waiting till they are loaded. 

Try / discover it by opening `demos/index.html`

## Version 0.3 used in 2sxc 18.00

The core goal is that no matter which parts are loaded in what order, no errors occur and in the end, things will just load. To make this happen, you need two things

1. to load the turnOn scripts (in 2sxc, a temporary solution is using `Edit.Enable(turnOn: true)` but this may still change)
1. add any html-tag containing a `turn-on` attribute with the configuration

Examples
```html
<!-- Just wait for window.myObject.start to exist, then run -->
<span turn-on='{ "run": "window.myObject.start()" }' />

<!-- Also include more data which will be passed to the run -->
<span turn-on='{ "run": "window.myObject.start()", "data": { "id": 27 } }' />
<span turn-on='{ "run": "window.myObject.start()", "data": { "module": @CmsContext.Module.Id } }' />

<!-- debug the data passed in to see if the data is as expected -->
<turnOn turn-on='{ "run": "window.turnOn.dump()", "data": { "module": @CmsContext.Module.Id } }' />

<!-- also wait for $ to exist (jQuery) -->
<span turn-on='{ "require": "window.$", "run": "window.myObject.start()" }' />

<!-- wait for jquery and some deeper object -->
<span turn-on='{ "require": ["window.$", "window.someObject.subObj", "window.something.isReady()"], "run": "window.myObject.start()" }' />
```

### Specs

1. property `run` as of now must always start with `window` and end with `()`  
    turnOn will verify that the parts leading up to the object exist before it's run.
1. property `await` is a string or string[]. It can just be a deep object or a function. Must always start with `window`
    If it's a function name, it will be called and only regarded as ready if the result is `true`.  
    No matter if function or name, turnOn will carefully test/watch each part to see if it exists.
1. property `args` would pass an array of arguments to the function _new v0.3.0_
1. property `data` passes one object to the run function - this is the classic method, but only works with functions that expect a single object

### Debugging

* As turnOn is working, the `turn-on` attribute is updated so you can watch a lot of what's happening
* You can always set `window.debugTurnOn = true;` to see a lot of logs.
* You can also use `<span turn-on='{ "run": "window.myObject.start()", debug: true }' />` to see more details for one specific turnOn


## Nice to Know

The solution is written in Typescript and is plain vanilla, no other dependencies used.

## Todo

1. Create NPM package
1. Ensure NPM package also has type definitions
1. add feature to get url from CDN etc. - kind of like loadJs
1. possibly also get css from a CDN?
1. create a special `custom-element` eg. `<turn-on>` which will be replaced with a span and the turn-on will be executed. This could be faster than the current Mutex-based solution.

Notes to follow up

https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523


## Original Thoughts 2021-05

Because of CSP etc. we're considering a model like this

<div turn-on='window.something.run'> 

or

<div turn-on='{ "await": ["window.yourJsExtension", "window.$", "window.yourApp.verifyReady()"], "run": "window.yourApp.start()" }'>

This would then kick off run once it's available. The call would then include a prepared object with various data to make the run do a better job. It would probably do this:

1. put the original turn-on into turn-on-raw
1. parse the turn-on and place the parsed object incl. progress etc. into turn-on

The object handed into the run would contain a reference to the tag what had this, so additional data could be attache do that tag for intialization. The object is probably

```ts
{
  turnOn: object,   //the current turn-on object
  tag: HtmlElement, // the html tag which started the turn-on and might contain extra configuration

}
```

---

## History

* v0.1.1 initial version
* v0.1.2 corrected so that `tag` no the context is the real html tag
* v0.2.0 changing `awaits` in html tag to be `require` because it's a reserved term in C# and most turnOn is made in C#
  note: we never bumped the version that's shown, so v0.2.0 still shows v0.1.2
* v0.3.0 adding `args` variant with optional `addContext`
