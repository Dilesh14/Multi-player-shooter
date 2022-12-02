const singletonFactory = (() => {
  let instance = null;
  return {
    getInstance: (klass) => {
      if (instance == null) {
        instance = new klass();
        instance.constructor = null;
      }
      return instance;
    },
  };
})();
