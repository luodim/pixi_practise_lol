
/*
Copyright 2013 Sub Protocol and other contributors
http://subprotocol.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// A simple 2-dimensional vector implementation


export default class Vec2 {
	constructor(x=0, y=0) {
		this.x = x
		this.y = y
	}

	add(v) {
		return new this.constructor(this.x + v.x, this.y + v.y)
	}

	sub(v) {
		return new this.constructor(this.x - v.x, this.y - v.y)
	}

	mul(v) {
		return new this.constructor(this.x * v.x, this.y * v.y)
	}

	div(v) {
		return new this.constructor(this.x / v.x, this.y / v.y)
	}

	scale(coef) {
		return new this.constructor(this.x*coef, this.y*coef)
	}

	mutableSet(v) {
		this.x = v.x
		this.y = v.y
		return this
	}

	mutableAdd(v) {
		this.x += v.x
		this.y += v.y
		return this
	}

	mutableSub(v) {
		this.x -= v.x
		this.y -= v.y
		return this
	}

	mutableMul(v) {
		this.x *= v.x
		this.y *= v.y
		return this
	}

	mutableDiv(v) {
		this.x /= v.x
		this.y /= v.y
		return this
	}

	mutableScale(coef) {
		this.x *= coef
		this.y *= coef
		return this
	}

	equals(v) {
		return this.x == v.x && this.y == v.y
	}

	epsilonEquals(v, epsilon) {
		return Math.abs(this.x - v.x) <= epsilon && Math.abs(this.y - v.y) <= epsilon
	}

	length(v) {
		return Math.sqrt(this.x*this.x + this.y*this.y)
	}

	length2(v) {
		return this.x*this.x + this.y*this.y
	}

	dist(v) {
		return Math.sqrt(this.dist2(v))
	}

	dist2(v) {
		const x = v.x - this.x
		const y = v.y - this.y
		return x*x + y*y
	}

	normal() {
		const m = Math.sqrt(this.x*this.x + this.y*this.y)
		return new this.constructor(this.x/m, this.y/m)
	}

	dot(v) {
		return this.x*v.x + this.y*v.y
	}

	angle(v) {
		return Math.atan2(this.x*v.y-this.y*v.x,this.x*v.x+this.y*v.y)
	}

	angle2(vLeft, vRight) {
		return vLeft.sub(this).angle(vRight.sub(this))
	}

	rotate(origin, theta) {
		const x = this.x - origin.x
		const y = this.y - origin.y
		return new this.constructor(x*Math.cos(theta) - y*Math.sin(theta) + origin.x, x*Math.sin(theta) + y*Math.cos(theta) + origin.y)
	}

	toString() {
		return `(${this.x}, ${this.y})`
	}
}


// function test_Vec2() {
// 	const assert = function(label, expression) {
// 		console.log("Vec2(" + label + "): " + (expression == true ? "PASS" : "FAIL"))
// 		if (expression != true)
// 			throw "assertion failed"
// 	}

// 	assert("equality", (new this.constructor(5,3).equals(new this.constructor(5,3))))
// 	assert("epsilon equality", (new this.constructor(1,2).epsilonEquals(new this.constructor(1.01,2.02), 0.03)))
// 	assert("epsilon non-equality", !(new this.constructor(1,2).epsilonEquals(new this.constructor(1.01,2.02), 0.01)))
// 	assert("addition", (new this.constructor(1,1)).add(new this.constructor(2, 3)).equals(new this.constructor(3, 4)))
// 	assert("subtraction", (new this.constructor(4,3)).sub(new this.constructor(2, 1)).equals(new this.constructor(2, 2)))
// 	assert("multiply", (new this.constructor(2,4)).mul(new this.constructor(2, 1)).equals(new this.constructor(4, 4)))
// 	assert("divide", (new this.constructor(4,2)).div(new this.constructor(2, 2)).equals(new this.constructor(2, 1)))
// 	assert("scale", (new this.constructor(4,3)).scale(2).equals(new this.constructor(8, 6)))
// 	assert("mutable set", (new this.constructor(1,1)).mutableSet(new this.constructor(2, 3)).equals(new this.constructor(2, 3)))
// 	assert("mutable addition", (new this.constructor(1,1)).mutableAdd(new this.constructor(2, 3)).equals(new this.constructor(3, 4)))
// 	assert("mutable subtraction", (new this.constructor(4,3)).mutableSub(new this.constructor(2, 1)).equals(new this.constructor(2, 2)))
// 	assert("mutable multiply", (new this.constructor(2,4)).mutableMul(new this.constructor(2, 1)).equals(new this.constructor(4, 4)))
// 	assert("mutable divide", (new this.constructor(4,2)).mutableDiv(new this.constructor(2, 2)).equals(new this.constructor(2, 1)))
// 	assert("mutable scale", (new this.constructor(4,3)).mutableScale(2).equals(new this.constructor(8, 6)))
// 	assert("length", Math.abs((new this.constructor(4,4)).length() - 5.65685) <= 0.00001)
// 	assert("length2", (new this.constructor(2,4)).length2() == 20)
// 	assert("dist", Math.abs((new this.constructor(2,4)).dist(new this.constructor(3,5)) - 1.4142135) <= 0.000001)
// 	assert("dist2", (new this.constructor(2,4)).dist2(new this.constructor(3,5)) == 2)

// 	const normal = (new this.constructor(2,4)).normal()
// 	assert("normal", Math.abs(normal.length() - 1.0) <= 0.00001 && normal.epsilonEquals(new this.constructor(0.4472, 0.89443), 0.0001))
// 	assert("dot", (new this.constructor(2,3)).dot(new this.constructor(4,1)) == 11)
// 	assert("angle", (new this.constructor(0,-1)).angle(new this.constructor(1,0))*(180/Math.PI) == 90)
// 	assert("angle2", (new this.constructor(1,1)).angle2(new this.constructor(1,0), new this.constructor(2,1))*(180/Math.PI) == 90)
// 	assert("rotate", (new this.constructor(2,0)).rotate(new this.constructor(1,0), Math.PI/2).equals(new this.constructor(1,1)))
// 	assert("toString", (new this.constructor(2,4)) == "(2, 4)")
// }

