DROP TABLE IF EXISTS `webinar_participants`;

CREATE TABLE IF NOT EXISTS `webinar_participants` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
);

CREATE TABLE `webinar_participants_webinars` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `webinar_id` integer NOT NULL,
    `webinar_participant_id` integer NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`webinar_participant_id`) REFERENCES `webinar_participants` (`id`) ON DELETE CASCADE
);