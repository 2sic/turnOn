# turnOn JavaScript Boot Helper

The goal of this small JS library is to help with dynamic loading JavaScripts. It should assist in loading these and waiting till they are loaded. 

Try / discover it by opening `demos/index.html`

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
    // add script tag to load
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

Notes to follow up

https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523