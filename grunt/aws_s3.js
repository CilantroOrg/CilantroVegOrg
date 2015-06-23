module.exports = {
  options: {
    accessKeyId: '<%= secret.aws_key %>',
    secretAccessKey: '<%= secret.aws_secret %>',
    uploadConcurrency: 50,
    progress: 'progressBar',
    params: {
      CacheControl: '0',
    }
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
     expand: true,
     src: '**/*',
     dest: '/',
     cwd: '<%= config.dist %>/',
   },
   smartling: {
     options: {
       bucket: '<%= secret.smartling_bucket %>'
     },
     expand: true,
     src: '**/*',
     cwd: '<%= config.dist %>/',
     dest: '/',
   },
   productionClear: {
     options: {
       differential: true,
       bucket: '<%= secret.s3_bucket %>'
     },
     action: 'delete',
     cwd: '<%= config.dist %>/',
     dest: '/'
   },
   stagingClear: {
     options: {
       differential: true,
       bucket: '<%= secret.s3_bucket %>'
     },
     action: 'delete',
     cwd: '<%= config.dist %>/',
     dest: '<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/',
  },
};
