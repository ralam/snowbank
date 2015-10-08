(function() {
  if (typeof Display === "undefined") {
    window.Display = {};
  }

  var Snowflake = Display.Snowflake = function(centerX, centerY, maxX, maxY) {
    this.pos = [centerX, centerY];
    this.maxX = maxX;
    this.maxY = maxY;
    this.color = "#ffffff";
    this.radius = this.RADIUS;
    this.velocity = this.randomVel();
    this.moving = true;
  };

  Snowflake.prototype.RADIUS = 2;

  Snowflake.addRandomSnowflake = function(maxX, maxY) {
    return new Snowflake(
      Math.floor(maxX * Math.random()),
      Math.floor(maxY * Math.random()),
      maxX,
      maxY
    );
  };

  Snowflake.prototype.move = function() {
    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
    this.wrap();
  };

  Snowflake.prototype.futurePos = function() {
    newPos = [this.pos[0] + this.velocity[0], this.pos[1] + this.velocity[1]];
    return newPos
  };

  Snowflake.prototype.stick = function () {
    this.moving = false;
  };

  Snowflake.prototype.wrap = function() {
    if (this.pos[0] >= (this.maxY - 1)) {
      this.pos[0] = 0;
    }
    if (this.pos[1] >= (this.maxY - 1)) {
      this.pos[1] = 0;
    }
  };

  Snowflake.prototype.randomVel = function() {
    var xNeg = 0;
    (Math.round(Math.random() * 2) === 0) ? xNeg = -1 : xNeg = 1;;
    var x = Math.ceil(Math.random() * 5);
    var y = Math.ceil(Math.random() * 4);
    return [x, y]
  };

  Snowflake.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  Snowflake.prototype.isCollidedWith = function(otherFlake) {
    var that = this;
    var xDist = Math.abs(this.pos[0] - otherFlake.pos[0]);
    var yDist = Math.abs(this.pos[1] - otherFlake.pos[1]);
    var distBetween = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    if (distBetween < (this.radius + otherFlake.radius)){
      return true;
    } else {
      return false;
    }
  };

})();
