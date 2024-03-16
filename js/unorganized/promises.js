let mm = new Promise((resolve, reject) => {
  if ("b" == 'a') {
    resolve(53);
  }
  reject("ok");
})

mm.then((val) => console.log(val), (reason) => console.log(reason))

