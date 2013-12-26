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
 * a HUD container and child items
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call the parent constructor
		this.parent();

		// persistent across level change
		this.isPersistent = true;

		// non collidable
		this.collidable = false;

		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";

		// add our child score object at position
		this.addChild(new game.HUD.ScoreItem(5, 5));
		this.addChild(new game.HUD.LifeItem(me.video.getWidth() - 145, 5));
	}
});

/*
 * HUD life item
 */
game.HUD.LifeItem = me.Renderable.extend(
{
	/*
	 * constructor
	 */
	init: function(x, y)
	{
		// call the parent constructor
		this.parent(new me.Vector2d(x, y));

		// make sure we use screen coordinates
		this.floating = true;

		// init stuff
		this.image = null;
		this.value = -1;
	},

	/*
	 * update life count
	 */
	update: function()
	{
		// we don't draw anything fancy here, so just
		// return true if the life count has been updated
		if (this.value !== game.data.life)
		{
			this.value = game.data.life;
			this.image = me.loader.getImage("life" + this.value);
			return true;
		}
		return false;
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// draw life indicator
		context.drawImage(this.image, this.pos.x, this.pos.y);
	}
});

/*
 * HUD score item
 */
game.HUD.ScoreItem = me.Renderable.extend(
{
	/*
	 * constructor
	 */
	init: function(x, y)
	{
		// call the parent constructor
		this.parent(new me.Vector2d(x, y));

		// init stuff
		this.font = new me.Font("Verdana", 20, "white");
		this.value = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/*
	 * update score
	 */
	update: function()
	{
		// we don't draw anything fancy here, so just
		// return true if the score has been updated
		if (this.value !== game.data.score)
		{
			this.value = game.data.score;
			return true;
		}
		return false;
	},

	/*
	 * draw score
	 */
	draw: function(context)
	{
		this.font.draw(context, "Score : " + game.data.score, this.pos.x, this.pos.y);
	}
});
