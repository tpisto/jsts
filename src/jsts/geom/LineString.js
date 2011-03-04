/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Constructs a <code>LineString</code> with the given points.
 *
 * @param {jsts.geom.Coordinate[]}
 *          points the points of the linestring, or <code>null</code> to
 *          create the empty geometry. Consecutive points may not be equal.
 * @param {GeometryFactory}
 *          factory GeometryFactory used to create the geometry.
 * @throws jsts.IllegalArgumentError
 *           if too few points are provided
 * @constructor
 */
jsts.geom.LineString = function(points) {
  this.init(points);
};

jsts.inherit(jsts.geom.LineString, jsts.geom.Geometry);


/**
 * @param {jsts.geom.Coordinate[]}
 *          points the points of the linestring, or <code>null</code> to
 *          create the empty geometry. Consecutive points may not be equal.
 */
jsts.geom.LineString.prototype.init = function(points) {
  if (points === null) {
    points = [];
  }
  if (points.length === 1) {
    throw new jsts.IllegalArgumentError(
        'Invalid number of points in LineString (found ' + points.length +
            ' - must be 0 or >= 2)');
  }
  this.points = points;
  // OL compat
  this.components = points;
};


/**
 * @return {jsts.geom.Coordinate[]} this LineString's internal coordinate array.
 */
jsts.geom.LineString.prototype.getCoordinates = function() {
  return this.points;
};


/**
 * @return {jsts.geom.Coordinate} The n'th coordinate of this LineString.
 * @param {int}
 *          n index.
 */
jsts.geom.LineString.prototype.getCoordinateN = function(n) {
  return this.points[n];
};


/**
 * @return {jsts.geom.Coordinate} The first coordinate of this LineString or
 *         null if empty.
 */
jsts.geom.LineString.prototype.getCoordinate = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.getCoordinate(0);
};


/**
 * @return {int} LineStrings are always 1-dimensional.
 */
jsts.geom.LineString.prototype.getDimension = function() {
  return 1;
};


/**
 * @return {int} dimension of the boundary of this LineString.
 */
jsts.geom.LineString.prototype.getBoundaryDimension = function() {
  if (this.isClosed()) {
    return Dimension.FALSE;
  }
  return 0;
};


/**
 * @return {Boolean} true if empty.
 */
jsts.geom.LineString.prototype.isEmpty = function() {
  return this.points.length === 0;
};


/**
 * @return {Boolean} true if LineString is Closed.
 */
jsts.geom.LineString.prototype.isClosed = function() {
  if (this.isEmpty()) {
    return false;
  }
  return this.getCoordinateN(0).equals2D(
      this.getCoordinateN(this.points.length - 1));
};


/**
 * @return {Boolean} true if LineString is a Ring.
 */
jsts.geom.LineString.prototype.isRing = function() {
  return this.isClosed() && this.isSimple();
};


/**
 * @return {String} String representation of LineString type.
 */
jsts.geom.LineString.prototype.getGeometryType = function() {
  return 'LineString';
};


/**
 * @param {Geometry}
 *          other Geometry to compare this LineString to.
 * @param {double}
 *          tolerance Tolerance.
 * @return {Boolean} true if equal.
 */
jsts.geom.LineString.prototype.equalsExact = function(other, tolerance) {
  var i;

  if (!this.isEquivalentClass(other)) {
    return false;
  }
  if (this.points.length !== other.points.length) {
    return false;
  }
  for (i = 0; i < this.points.length; i++) {
    if (!jsts.geom.Geometry.equal(this.points[i], other.points[i], tolerance)) {
      return false;
    }
  }
  return true;
};


/**
 * Creates and returns a full copy of this {@link LineString} object. (including
 * all coordinates contained by it).
 *
 * @return {jsts.geom.LineString} a clone of this instance.
 */
jsts.geom.LineString.prototype.clone = function() {
  var key, coordinate;

  var points = [];
  for (key in this.points) {
    if (this.points.hasOwnProperty(key)) {
      coordinate = this.points[key];
      points.push(coordinate.clone());
    }
  }

  var clone = new jsts.geom.LineString(points);

  return clone;
};

//OL compat
jsts.geom.LineString.prototype.calculateBounds = function() {
  // TODO: calc real bounds
  this.bounds = new OpenLayers.Bounds(this.points[0].x, this.points[0].y,
      this.points[0].x, this.points[0].y);
};
jsts.geom.LineString.prototype.CLASS_NAME = 'OpenLayers.Geometry.LineString';
