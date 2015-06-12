module.exports = {
	options: {
      accessKeyId: '<%= secret.aws_key %>',
      secretAccessKey: '<%= secret.aws_secret %>',
      access: 'public-read',
      cache: false,
    },
    staging: {
      options: {
        bucket: '<%= secret.s3_bucket %>'
      },
      expand: true,
      src: '**',
      cwd: '<%= config.dist %>/',
      dest: '<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/',
    },
    production: {
      options: {
        bucket: '<%= secret.s3_bucket %>'
      },
      src: '**/*',
      cwd: '<%= config.dist %>/'
    },
    smartling: {
      options: {
        bucket: '<%= secret.smartling_bucket %>'
      },
      src: '**/*',
      cwd: '<%= config.dist %>/'
    },
    productionClear: {
    	options: {
    			bucket: '<%= secret.s3_bucket %>'
    		},
    	action: 'delete',
    	dest: '/'
 	  },
	stagingClear: {
		options: {
    			bucket: '<%= secret.s3_bucket %>'
    		},
		action: 'delete',
		dest: '<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/',
	},
};