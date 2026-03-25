CREATE DATABASE IF NOT EXISTS node_dashboard;
USE node_dashboard;

CREATE TABLE IF NOT EXISTS nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    callsign VARCHAR(20) NOT NULL,
    ip VARCHAR(15) NOT NULL,
    status ENUM('online','offline') DEFAULT 'offline',
    last_heartbeat DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO nodes (callsign, ip, status) VALUES
('NODE1','192.168.1.10','online'),
('NODE2','192.168.1.11','offline'),
('NODE3','192.168.1.12','online');
