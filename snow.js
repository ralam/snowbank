(function() {
  if (typeof Display === "undefined") {
    window.Display = {};
  }

  var Snow = Display.Snow = function(x, y) {
    this.x = x;
    this.y = y;
    this.snowflakes = [];
    this.snowbank = [];
    this.movingSnowflakes = [];
    for(var i = 0; i < this.NUM_SNOWFLAKES; i++) {
      newSnowflake = Display.Snowflake.addRandomSnowflake(x, y);
      this.snowflakes.push(newSnowflake);
    }
  };

  Snow.prototype.NUM_SNOWFLAKES = 500;

  Snow.prototype.moveSnowflakes = function(ctx) {
    this.movingSnowflakes = [];
    this.snowbank = []
    this.snowflakes.forEach(function(snowflake) {
      snowflake.move();
    }.bind(this));
    this.snowflakes.forEach(function(snowflake){
      if (snowflake.moving) {
        this.movingSnowflakes.push(snowflake);
      } else {
        this.snowbank.push(snowflake);
      }
    }.bind(this))
    this.snowflakes.forEach(function(snowflake) {
      snowflake.render(ctx)
    });

  };

})();
