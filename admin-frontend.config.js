module.exports = {
    apps: [
        {
            name: "admin-frontend",
            script: "serve -s build -l 5010",
            error_file: '/logs/err.log',
            out_file: '/logs/out.log',
            log_file: '/logs/combined.log',
            time: true
        }
    ]
}