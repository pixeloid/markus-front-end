module.exports = function(grunt) {


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
		// Task configuration
	concat: {
		all:{
			options: {
				separator: ';',
			},
			src: [
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/bootstrap/dist/js/bootstrap.js',
			'./bower_components/idangerous-swiper/dist/idangerous.swiper.min.js',
			'./src/js/app.js'
			],
			dest: './dist/js/app.js'
		}
	},
	copy: {
	  main: {
	    files: [
	      // includes files within path
	      {expand: true, cwd: './bower_components/bootstrap/fonts/', src: ['*'], dest: 'dist/fonts/', filter: 'isFile'},
	      {expand: true, cwd: './bower_components/idangerous-swiper/dist/', src: ['idangerous.swiper.css'], dest: 'dist/css/', filter: 'isFile'},
	      {expand: true, cwd: './src/i/', src: ['*/**'], dest: 'dist/i/'}
	    ]
	  }
	},
	assemble: {
	  options: {
	    assets: '.',
	    plugins: ['permalinks'],
//	    partials: ['includes/**/*.hbs'],
	    layout: ['./src/layouts/default.hbs'],
//	    data: ['data/*.{json,yml}'],
	    postprocess: require('pretty')
	  },
	  pages: {
	    src: ['**/*.hbs'],
	    cwd: './src/docs/',
	    dest: 'dist',
	    expand: true
	  }
	},

	less: {
		all: {
			options: {
			 	compress: true,  //minifying the result
			},
			files: {
		  		//compiling frontend.less into frontend.css
				"./dist/css/styles.css":"./src/less/styles.less"
			}
		}
	},
	uglify: {
		all:{
			options: {
				mangle: false  // Use if you want the names of your functions and variables unchanged
			},
			files: {
				'./dist/js/app.js': './dist/js/app.min.js'
			}

		}
	},
	connect: {
		all: {
			options:{
				port: 9000,
				hostname: "0.0.0.0",
				middleware: function(connect, options) {
					
					return [
					
					    // Load the middleware provided by the livereload plugin
					    // that will take care of inserting the snippet
					    require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

					    // Serve the project folder
					    connect.static('dist')
					    ];
				}
			}
		}
	},

	open: {
		all: {
		    // Gets the port from the connect configuration
		    path: 'http://localhost:<%= connect.all.options.port%>'
		}
	},
	regarde: {
		all: {
		    // This'll just watch the index.html file, you could add **/*.js or **/*.css
		    // to watch Javascript and CSS files too.
		    files:['src/**/*.hbs', 'src/**/*.less', 'src/**/*.js'],
		    // This configures the task that will run when the file change
		    tasks: ['concat', 'less', 'assemble','livereload']
		}
	},

	'ftp-deploy': {
	  build: {
	    auth: {
	      host: 'ftp.pixeloid.hu',
	      port: 21,
	      authKey: 'key1'
	    },
	    src: './dist',
	    dest: 'htdocs/markus',
	    exclusions: ['./dist/**/.DS_Store', './dist/**/Thumbs.db', './dist/tmp']
	  }
	}


});


grunt.loadNpmTasks('assemble' );


	// Task definition
	grunt.registerTask('server', [
		    // Starts the livereload server to which the browser will connect to
		    // get notified of when it needs to reload
		    'concat',
		    'copy',
		    'assemble',
		    'livereload-start',
		    'connect',
		    // Connect is no longer blocking other tasks, so it makes more sense to open the browser after the server starts
		    'open',
		    // Starts monitoring the folders and keep Grunt alive
		    'regarde'

	]);

};