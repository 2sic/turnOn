# turnOn JavaScript Boot Helper

The goal of this small JS library is to help with dynamic loading JavaScripts. It should assist in loading these and waiting till they are loaded. 

Try / discover it by opening `demos/index.html`

## Version 0.1

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

<!-- also wait for $ to exist (jQuery) -->
<span turn-on='{ "await": "window.$", "run": "window.myObject.start()" }' />

<!-- wait for jquery and some deeper object -->
<span turn-on='{ "await": ["window.$", "window.someObject.subObj", "window.something.isReady()"], "run": "window.myObject.start()" }' />
```

### Specs

1. property `run` as of now must always start with `window` and end with `()`  
    turnOn will verify that the parts leading up to the object exist before it's run. 
1. property `await` is a string or string[]. It can just be a deep object or a function. Must always start with `window`
    If it's a function name, it will be called and only regarded as ready if the result is `true`.  
    No matter if function or name, turnOn will carefully test/watch each part to see if it exists.

### Debugging

* As turnOn is working, the `turn-on` attribute is updated so you can watch a lot of what's happening
* You can always set `window.debugTurnOn = true;` to see a lot of logs.
* You can also use `<span turn-on='{ "run": "window.myObject.start()", debug: true }' />` to see more details for one specific turnOn



## More notes - random - don't use as reference!

The API is still far from final, but in the end it should look a bit like this:

```js
// this is what your typescript code would look like
new TurnOn()
  .await('window.yourJsExtension')
  .then(() => yourJsExtension.start());
```

More sophisticated samples will be like this:

```typescript
new TurnOn()
  .await([
    // check for keys on window
    'window.yourJsExtension',
    'window.$',
    // do custom check
    () => window.something?.deeper?.andDeeper != null,
    // add script tag to load (not implemented yet)
    'https://some-cdn.org/something.js",
  ], {
    interval: 100,
    maxAttempts: 100,
  })
  .then(() => window.yourJsExtension.Start());
```

## Nice to Know

The solution is written in Typescript and is plain vanilla, no other dependencies used. 

## Todo

1. Create NPM package
1. Ensure NPM package also has type definitions
1. add feature to get url from CDN etc.
1. possibly also get css from a CDN?

Notes to follow up

https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523




## Thoughts 2021-05

Because of CSP etc. we're considering a model like this

<div turn-on='window.something.run'> 

or

<div turn-on='{ "await": ["window.yourJsExtension", "window.$", "window.yourApp.verifyReady()"], "run": "window.yourApp.start" }'>

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


```cs

Needs.Js(...);



```