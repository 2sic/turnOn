# experimental-js-dynamic-loader

The goal of this small JS library is to help with dynamic loading JavaScripts. It should assist in loading these and waiting till they are loaded. 

The API is still far from final, but in the end it should look a bit like this:

```js
new Kickstart()
  .await('window.yourJsExtension')
  .then(() => yourJsExtension.start());
```

More sophisticated samples will be like this:

```typescript
new Kickstart()
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


Notes to follow up

https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523