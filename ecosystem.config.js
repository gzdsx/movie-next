module.exports = {
    apps: [{
        name: "xiaomavv",
        script: ".next/standalone/server.js",
        "instances": "2",
        "exec_mode": "cluster",
        "exp_backoff_restart_delay": 100,
        "max_memory_restart": "1G",
        "autorestart": true,
        "watch": false,
        env: {
            PORT: 3123,            // 指定端口
            HOSTNAME: "127.0.0.1",   // 允许外部访问，或设为 127.0.0.1 仅限 Nginx 转发
            NODE_ENV: "production"
        }
    }]
}
