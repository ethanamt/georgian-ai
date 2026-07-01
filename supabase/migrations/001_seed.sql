-- Seed achievements
INSERT INTO achievements (slug, title, description, icon, condition_type, condition_value) VALUES
('first_lesson', 'Première leçon', 'Terminer votre première leçon', 'book-open', 'lessons_completed', 1),
('streak_3', 'Sur la bonne voie', 'Atteindre un streak de 3 jours', 'zap', 'streak', 3),
('streak_7', 'Semaine parfaite', 'Atteindre un streak de 7 jours', 'zap', 'streak', 7),
('streak_30', 'Mois d''or', 'Atteindre un streak de 30 jours', 'zap', 'streak', 30),
('alphabet_master', 'Maître de l''alphabet', 'Maîtriser les 33 lettres', 'alphabet', 'letters_mastered', 33),
('vocab_10', 'Apprenti lexicographe', 'Apprendre 10 mots', 'book', 'words_known', 10),
('vocab_50', 'Lexicographe', 'Apprendre 50 mots', 'book', 'words_known', 50),
('first_review', 'Réviseur', 'Terminer votre première session de révision', 'refresh-cw', 'reviews_completed', 1),
('perfect_exercise', 'Sans faute', 'Réussir un exercice à 100%', 'target', 'perfect_exercises', 1),
('conversation_5', 'Conversateur', 'Terminer 5 conversations IA', 'message-circle', 'conversations_completed', 5);

-- Seed alphabet lessons
INSERT INTO lessons (slug, title, description, category, level, order_index, estimated_minutes) VALUES
('alphabet-1', 'L''alphabet géorgien - Partie 1', 'Découvrez les premières lettres', 'alphabet', 'A1', 1, 10),
('alphabet-2', 'L''alphabet géorgien - Partie 2', 'Consonnes et voyelles', 'alphabet', 'A1', 2, 10),
('alphabet-3', 'L''alphabet géorgien - Partie 3', 'Les 33 lettres', 'alphabet', 'A1', 3, 10),
('greetings', 'Salutations', 'Dire bonjour, au revoir, merci', 'vocabulary', 'A1', 4, 15),
('introductions', 'Se présenter', 'Comment se présenter en géorgien', 'vocabulary', 'A1', 5, 15),
('numbers-1', 'Les nombres 1-10', 'Compter de 1 à 10', 'vocabulary', 'A1', 6, 10),
('family', 'La famille', 'Les membres de la famille', 'vocabulary', 'A1', 7, 15),
('colors', 'Les couleurs', 'Les couleurs de base', 'vocabulary', 'A1', 8, 10),
('present-etre', 'Le verbe être', 'Conjugaison de ყოფნა au présent', 'grammar', 'A1', 9, 10);
