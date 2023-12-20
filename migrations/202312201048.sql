CREATE TABLE IF NOT EXISTS `webinars` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `shortcode` varchar(8) NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `meeting_link` varchar(255) NOT NULL,
    `starts_at` datetime NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `webinar_handouts` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `webinar_id` integer NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `thumbnail` varchar(255) NOT NULL,
    `file` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `webinar_participants` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `webinar_id` integer NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE
);