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

  Snow.prototype.NUM_SNOWFLAKES = 250;

  Snow.prototype.moveSnowflakes = function(ctx) {
    this.movingSnowflakes = [];

    this.snowflakes.forEach(function(snowflake) {
      var futurePos = snowflake.futurePos();
      this.checkCollisions(snowflake, futurePos);
      if (snowflake.moving) {
        snowflake.move();
      }
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

  Snow.prototype.isCollidedWith = function(pos, otherFlake) {
    var that = this;
    var xDist = Math.abs(pos[0] - otherFlake[0]);
    var yDist = Math.abs(pos[1] - otherFlake[1]);
    var distBetween = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    if (distBetween < (4) && pos[0] != otherFlake[0] && pos[1] != otherFlake[1]){
      return true;
    } else {
      return false;
    }
  };

  Snow.prototype.checkCollisions = function(snowflake, futurePos){
    var that = this;

    this.snowbank.forEach(function(stoppedSnowflake){
      if (this.isCollidedWith(futurePos, stoppedSnowflake)) {
        snowflake.stick();
      };
    }.bind(this));
  };

})();
