TWEEN.Easing.glow = {};

TWEEN.Easing.glow.glowEasingOut = function( k ) {
  var t = (k*100); // add this
  var d = 100; // add this

  var ts=(t/=d)*t;
  var tc=ts*t;
  return (-0.349999999999998*tc*ts + 1.4*ts*ts + -1.1*tc + -1.6*ts + 2.65*t); // remove "b+c*"
};