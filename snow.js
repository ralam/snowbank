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
    this.boundary = Array.apply(null, {length: y}).map(Number.call, Number)
    for(var i = 0; i < this.NUM_SNOWFLAKES; i++) {
      newSnowflake = Display.Snowflake.addRandomSnowflake(x, y);
      this.snowflakes.push(newSnowflake);
    }
  };

  Snow.prototype.NUM_SNOWFLAKES = 500;

  Snow.prototype.moveSnowflakes = function(ctx) {
    this.movingSnowflakes = [];

    this.snowflakes.forEach(function(snowflake) {
      if (snowflake.moving) {
        snowflake.move();
        this.checkCollisions(snowflake);
      }
      this.checkCollisions(snowflake, snowflake.pos);
    }.bind(this));
    this.snowbank = []
    this.snowflakes.forEach(function(snowflake){
      if (snowflake.moving) {
        this.movingSnowflakes.push(snowflake);
      } else {
        this.snowbank.push(snowflake.pos);
      }
    }.bind(this))
    this.snowflakes.forEach(function(snowflake) {
      snowflake.render(ctx)
    });
    if (this.movingSnowflakes.length === 0) {
      console.log(this.snowbank.length)
    }

  };

  Snow.prototype.isCollidedWith = function(snowflake, otherFlake) {
    var that = this;
    var xDist = Math.abs(snowflake.pos[0] - otherFlake[0]);
    var yDist = Math.abs(snowflake.pos[1] - otherFlake[1]);
    var distBetween = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    if (distBetween < (4) && snowflake.pos[0] != otherFlake[0] && snowflake.pos[1] != otherFlake[1]){
      return true;
    } else {
      return false;
    }
  };

  Snow.prototype.checkCollisions = function(snowflake){
    var that = this;

    this.snowbank.forEach(function(stoppedSnowflake){
      if (this.isCollidedWith(snowflake, stoppedSnowflake)) {
        snowflake.stick();
      };
    }.bind(this));
  };

})();
