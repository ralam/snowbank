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
      maxX * Math.random(),
      maxY * Math.random(),
      maxX,
      maxY
    );
  };

  Snowflake.prototype.move = function() {
    if (this.moving)
    {this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
    this.wrap();}
  };

  Snowflake.prototype.wrap = function() {
    if (this.pos[0] >= (this.maxY - 1)) {
      this.pos[0] = 0;
    }
    if (this.pos[1] >= (this.maxY - 1)) {
      this.velocity = [0, 0]; //stop snowflake;
      this.moving = false;
    }
  };

  // Snowflake.prototype.stop = function() {
  //   if this.pos[0] += this.
  // };

  Snowflake.prototype.randomVel = function() {
    var xNeg = 0;
    (Math.round(Math.random() * 2) === 0) ? xNeg = -1 : xNeg = 1;;
    var x = Math.ceil(Math.random() * 5);
    var y = Math.ceil(Math.random() * 5);
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

})();
