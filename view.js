(function () {
  if (typeof Display === "undefined") {
    window.Display = {};
  }

  var View = Display.View = function(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.snowflakePositions = [];

    this.snowflakes = [];
    for(var i = 0; i < this.NUM_SNOWFLAKES; i++) {
      this.snowflakes.push(
        Display.Snowflake.randomSnowflake(x, y)
      );
    }
  };

  View.prototype.DIM_X = 500;
  View.prototype.DIM_Y = 500;
  View.prototype.NUM_SNOWFLAKES = 500;

  View.prototype.render = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    this.moveSnowflakes(ctx);
  };

  View.prototype.moveSnowflakes = function(ctx) {
    var view = this;
    this.snowflakePositions = [];
    this.snowflakes.forEach(function(snowflake) {
      snowflake.move();
    });
    this.snowflakes.forEach(function(snowflake) {
      this.snowflakePositions.push(snowflake.pos);
    });
    this.snowflakes.forEach(function(snowflake) {
      snowflake.render(ctx)
    });
  };

  View.prototype.start = function (el) {

    var ctx = el.getContext("2d");

    window.setInterval((function() {
      this.render(ctx);
    }).bind(this), 1000 / 60);
  };
})();
