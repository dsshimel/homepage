(function () {
  var canvas = document.createElement("canvas");
  canvas.id = "rogue-rain";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;";
  document.body.prepend(canvas);

  var ctx = canvas.getContext("2d");
  var chars = "@#.+*])?!%/BSKEHZADd:^|~";
  var fontSize = 16;
  var columns;
  var drops;

  // Color palettes — dim and bright variants for trail vs head
  var palettes = [
    // Greens
    { dim: "#1a4a1a", mid: "#2a7a2a", bright: "#44cc44" },
    { dim: "#1a3a1a", mid: "#228822", bright: "#33bb33" },
    // Yellows / amber
    { dim: "#4a3a00", mid: "#886600", bright: "#cccc00" },
    { dim: "#3a2a00", mid: "#775500", bright: "#cc8800" },
    // Browns / copper
    { dim: "#3a2211", mid: "#6b4422", bright: "#b87333" },
    { dim: "#2a1a0a", mid: "#5a3318", bright: "#8b5a2b" },
  ];

  var columnPalettes;
  var columnSpeeds;

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns);
    columnPalettes = new Array(columns);
    columnSpeeds = new Array(columns);
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      columnPalettes[i] = palettes[Math.floor(Math.random() * palettes.length)];
      columnSpeeds[i] = 0.3 + Math.random() * 0.7;
    }
  }

  init();
  window.addEventListener("resize", init);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px 'IBM Plex Mono', 'Courier New', monospace";

    for (var i = 0; i < columns; i++) {
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      var pal = columnPalettes[i];
      var ch = chars[Math.floor(Math.random() * chars.length)];

      // Head character — bright
      ctx.fillStyle = pal.bright;
      ctx.globalAlpha = 0.9;
      ctx.fillText(ch, x, y);

      // One behind head — mid tone
      ctx.fillStyle = pal.mid;
      ctx.globalAlpha = 0.5;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

      // Two behind — dim
      ctx.fillStyle = pal.dim;
      ctx.globalAlpha = 0.3;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 2);

      ctx.globalAlpha = 1.0;

      drops[i] += columnSpeeds[i];

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        columnPalettes[i] = palettes[Math.floor(Math.random() * palettes.length)];
        columnSpeeds[i] = 0.3 + Math.random() * 0.7;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
