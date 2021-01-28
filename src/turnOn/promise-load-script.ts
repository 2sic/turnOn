

// WIP 
// Inspired by https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523

// Todo
// - check if the script tag already exists - possibly with an imprecise match as well, in case a similar url exists
// - verify the code actually works
// - find out how to specify more exactly what kind of tag is needed

// this function will work cross-browser for loading scripts asynchronously
function promiseLoadScript(src: string) {

  return new Promise<boolean>(function(resolve, reject) {
    const s = document.createElement('script');
    let r = false;
    s.type = 'text/javascript';
    s.src = src;
    s.async = true;
    s.onerror = function(err) {
      reject(err);
    };
    s.onload = function() {
      resolve(true);
    }
    const t = document.getElementsByTagName('script')[0];
    t.parentElement.insertBefore(s, t);
  });
}