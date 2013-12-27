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
 * main functions
 */

var game =
{
	/*
	 * an object where to store game global data
	 */
	data:
	{
		score: -1,
		life: -1,
		audioMuted: false,
		version: "0.5"
	},

	/*
	 * Initialize the game
	 */
	onload: function()
	{
		// init the video
		if (!me.video.init("screen", 800, 450))
		{
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// initialize the audio
		me.audio.init("mp3,ogg");

		// set a callback to run when loading is complete
		me.loader.onload = this.loaded.bind(this);

		// load the resources
		me.loader.preload(game.resources);

		// initialize melonJS and display a loading screen
		me.state.change(me.state.LOADING);
	},

	/*
	 * callback when everything is loaded
	 */
	loaded: function ()
	{
		// set the "Menu" Screen Object
		me.state.set(me.state.MENU, new game.MenuScreen());

		// set the "Play" Screen Object
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// set the "Game over" Screen Object
		me.state.set(me.state.GAMEOVER, new game.GameOverScreen());

		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 250);

		// disable transition for MENU and GAMEOVER screen
		me.state.setTransition(me.state.MENU, false);
		me.state.setTransition(me.state.GAMEOVER, false);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.SPACE, "fire", true);
		me.input.bindKey(me.input.KEY.M, "mute", true);

		// start the game
		me.state.change(me.state.MENU);
	}
}; // game

// game resources
game.resources =
[
	// parallax background
	{name: "bkg0", type: "image", src: "img/bkg0.png"},
	{name: "bkg1", type: "image", src: "img/bkg1.png"},

	// interface
	{name: "title", type: "image", src: "img/title.png"},
	{name: "play", type: "image", src: "img/play.png"},
	{name: "play_hover", type: "image", src: "img/play_hover.png"},
	{name: "restart", type: "image", src: "img/restart.png"},
	{name: "restart_hover", type: "image", src: "img/restart_hover.png"},
	{name: "menu", type: "image", src: "img/menu.png"},
	{name: "menu_hover", type: "image", src: "img/menu_hover.png"},

	// life
	{name: "life0", type: "image", src: "img/life0.png"},
	{name: "life1", type: "image", src: "img/life1.png"},
	{name: "life2", type: "image", src: "img/life2.png"},
	{name: "life3", type: "image", src: "img/life3.png"},

	// game
	{name: "ship", type: "image", src: "img/ship.png"},
	{name: "enemy", type: "image", src: "img/enemy.png"},
	{name: "missile", type: "image", src: "img/missile.png"},
	{name: "implosion", type: "image", src: "img/implosion.png"},

	// music
	{name: "menu_theme", type: "audio", src: "music/", channel: 1},
	{name: "game_theme", type: "audio", src: "music/", channel: 1},

	// sound
	{name: "clash", type: "audio", src: "sound/", channel: 1},
	{name: "missile", type: "audio", src: "sound/", channel: 5},
	{name: "implosion", type: "audio", src: "sound/", channel: 3}
];
