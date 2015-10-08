(function() {
  if (typeof Display === "undefined") {
    window.Display = {};
  }

  var Snow = Display.Snow = function(x, y) {
    this.x = x;
    this.y = y;
    this.snowflakes = [];
    for(var i = 0; i < this.NUM_SNOWFLAKES; i++) {
      this.snowflakes.push(
        Display.Snowflake.addRandomSnowflake(x, y)
      );
    }
  };

  Snow.prototype.NUM_SNOWFLAKES = 500;

  Snow.prototype.moveSnowflakes = function(ctx) {
    this.snowflakes.forEach(function(snowflake) {
      snowflake.move();
    });
    this.snowflakes.forEach(function(snowflake) {
      snowflake.render(ctx)
    });
  };
})();
