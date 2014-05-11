module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'./dist/main.css': './src/scss/main.scss',
				}
			}
		},

		connect: {
			dev: {
				options: {
					port: 8000,
					base: './dist',
					keepalive: true
				}
			}
		},

		assemble: {
			options: {
				/* specify lists of posts/pages as collections to loop through for content */
				collections: [{
					name: 'post',
					sortby: 'posted',
					sortorder: 'descending'
				}],
				helpers: './src/bonnet/helpers/**/*.js',
				layout: 'page.hbs',
				layoutdir: './src/bonnet/layouts/',
				partials: './src/bonnet/partials/**/*.hbs'
			},
			posts: {
				/* tells assemble process all content pages and put them in the dist folder */
				files: [{
					cwd: './src/content/',
					dest: './dist/',
					expand: true,
					src: ['**/*.hbs', '!_pages/**/*.hbs']
				},
				/* tells assemble to compile the contents of the pages directory and also put them in the dist folder */
				{
					cwd: './src/content/_pages/',
					dest: './dist/',
					expand: true,
					src: '**/*.hbs'
				}]
			}
		}
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-sass');

	/* grunt tasks */
	grunt.registerTask('default', ['assemble', 'sass', 'connect']);

};
