module.exports = {
  apps: {
    name: 'socketIO',
    script: './server/server.js',
    env: {
      NODE_ENV: 'production'
    }
  }
};

//
/* 
{
  name: 'websit_node',
  script: './server/server.js',
  args: 'one two',
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  interpreter: 'node_modules/@babel/node/bin/babel-node.js',
  env: {
    NODE_ENV: 'production'
  },
  env_dev: {
    NODE_ENV: 'development'
  },
  env_pred: {
    NODE_ENV: 'production'
  },
  env_prod: {
    NODE_ENV: 'production'
  }
} 
*/
/* 
{
  name: 'socketIO',
  script: './server/server.js',
  env: {
    NODE_ENV: 'production'
  }
} 
    */
