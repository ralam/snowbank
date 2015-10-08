(function() {
  if (typeof Display === "undefined") {
    window.Display = {};
  }

  var Snow = Display.Snow = function(x, y) {
    this.x = x;
    this.y = y;
    this.snowflakes = [];
    this.boundary = Array.apply(null, Array(y)).map(function(){return 500})
    console.log(this.boundary);
    for(var i = 0; i < this.NUM_SNOWFLAKES; i++) {
      this.snowflakes.push(Display.Snowflake.addRandomSnowflake(x, y));
    }
  };

  Snow.prototype.NUM_SNOWFLAKES = 1500;

  Snow.prototype.moveSnowflakes = function(ctx) {
    this.snowflakes.forEach(function(snowflake) {
      if (snowflake.moving) {
        snowflake.move();
        this.checkCollisions(snowflake);
      }
    }.bind(this));
    this.snowflakes.forEach(function(snowflake) {
      snowflake.render(ctx)
    });
  };

  Snow.prototype.isCollidedWith = function(snowflake, range) {
    var that = this;
    var stuck = false
    for (var i = 0; i < range.length; i++) {
      var yDist = Math.abs(snowflake.pos[1] - this.boundary[range[i]]);
      if (snowflake.pos[1] >= this.boundary[range[i]] - snowflake.radius) {
        stuck = true;
        this.boundary[range[i]] -= 1;
        this.boundary[range[i + 1]] -= 0.25;
        this.boundary[range[i - 1]] -= 0.25;
        return stuck;
        break
      }
    }
  };

  Snow.prototype.checkCollisions = function(snowflake){
    var that = this;
    var y = snowflake.pos[1]
    var range = [(y - 1), y, (y + 1)]
    if (this.isCollidedWith(snowflake, range)) {
      snowflake.stick();
    }
  };
})();
