

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


// other code from 2sxc UI

// private insertToDom(files: LoadFile[], callback: () => any, increment: number) {
//   const file = files[increment];
//   increment++;
//   if (!file) {
//     callback();
//     return;
//   }
//   file.path = file.path + '?sxcver=' + sxcVersion; // break cache

//   const existing = this.loadedFiles.find(loadedFile => loadedFile.path === file.path);
//   if (existing) {
//     if (existing.loaded) {
//       this.insertToDom(files, callback, increment);
//     } else {
//       const _listener = () => {
//         file.loaded = true;
//         this.insertToDom(files, callback, increment);
//         existing.domEl.removeEventListener('load', _listener);
//         existing.domEl.removeEventListener('error', _listener);
//       };
//       existing.domEl.addEventListener('load', _listener);
//       existing.domEl.addEventListener('error', _listener);
//     }
//   } else {
//     if (file.type === FileTypeConstants.CSS) {
//       file.domEl = document.createElement('link');
//       file.domEl.rel = 'stylesheet';
//       file.domEl.href = file.path;
//     } else if (file.type === FileTypeConstants.JS) {
//       file.domEl = document.createElement('script');
//       file.domEl.type = 'module';
//       file.domEl.src = file.path;
//     }

//     const _listener = () => {
//       file.loaded = true;
//       this.insertToDom(files, callback, increment);
//       file.domEl.removeEventListener('load', _listener);
//       file.domEl.removeEventListener('error', _listener);
//     };
//     file.domEl.addEventListener('load', _listener);
//     file.domEl.addEventListener('error', _listener);

//     document.querySelector('head').appendChild(file.domEl);
//     this.loadedFiles.push(file);
//   }
// }