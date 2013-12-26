/*
 * InvasionJS
 * Copyright (c) 2013 Gwillald, Semche
 * 
 * This software is provided 'as-is', without any express or
 * implied warranty. In no event will the authors be held
 * liable for any damages arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute
 * it freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented;
 *    you must not claim that you wrote the original software.
 *    If you use this software in a product, an acknowledgment
 *    in the product documentation would be appreciated but
 *    is not required.
 * 
 * 2. Altered source versions must be plainly marked as such,
 *    and must not be misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered from any
 *    source distribution.
 */

/*
 * draw a button on screen
 */
var Button = me.Rect.extend(
{
	/*
	 * constructor
	 */
	init: function(image, action, y)
	{
		// init stuff
		this.image = me.loader.getImage(image);
		this.image_hover = me.loader.getImage(image + "_hover");
		this.action = action;
		this.pos = new me.Vector2d((me.video.getWidth() / 2 - this.image.width / 2), y);

		// call parent constructor
		this.parent(this.pos, this.image.width, this.image.height);

		// register mouse event
		me.input.registerPointerEvent("mousedown", this, this.clicked.bind(this));
	},

	/*
	 * action to perform when a button is clicked
	 */
	clicked: function()
	{
		// start action
		me.state.change(this.action);
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// on button hovered
		if (this.containsPointV(me.input.mouse.pos))
			context.drawImage(this.image_hover, this.pos.x, this.pos.y);
		else
			context.drawImage(this.image, this.pos.x, this.pos.y);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse events
		me.input.releasePointerEvent("mousedown", this);
	}
});

/*
 * background layer
 */
var BackgroundLayer = me.ImageLayer.extend(
{
	/*
	 * constructor
	 */
	init: function(image, speed)
	{
		name = image;
		width = 1000;
		height = 450;
		z = 1;
		ratio = 1;
		this.speed = speed;

		// call parent constructor
		this.parent(name, width, height, image, z, ratio);
	},

	/*
	 * update function
	 */
	update: function()
	{
		// recalibrate image position
		if (this.pos.x >= this.imagewidth - 1)
			this.pos.x = 0;

		// increment horizontal background position
		this.pos.x += this.speed;

		return true;
	}
});

/*
 * parallax background
 */
var BackgroundObject = Object.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		me.game.add(new BackgroundLayer("bkg0", 0.9), 1); // layer 1
		me.game.add(new BackgroundLayer("bkg1", 1.5), 2); // layer 2
	},

	/*
	 * update function
	 */
	update: function()
	{
		return true;
	}
});
