-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 23 mars 2023 à 10:36
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `film`
--

-- --------------------------------------------------------

--
-- Structure de la table `generalite`
--

CREATE TABLE `generalite` (
  `id_movie` int(11) NOT NULL,
  `id_real` int(11) NOT NULL,
  `id_genre1` int(11) NOT NULL,
  `id_genre2` int(11) DEFAULT NULL,
  `duree` int(11) NOT NULL,
  `titre` varchar(9999) NOT NULL,
  `image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `generalite`
--

INSERT INTO `generalite` (`id_movie`, `id_real`, `id_genre1`, `id_genre2`, `duree`, `titre`, `image`) VALUES
(1, 1, 2, NULL, 165, 'Le parrain', 'https://www.cnc.fr/documents/36995/1603590/LeParrain.jpg/815af39c-5ce9-0c4b-85be-6c3e804a3734?t=1648651157766'),
(2, 2, 2, 0, 201, 'Le seigneur des anneau: le retour du roi', 'https://flixable.b-cdn.net/amazon-prime-video/large/fr/le-seigneur-des-anneaux-le-retour-du-roi.png'),
(3, 3, 3, NULL, 139, 'Fight Club', 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71YFxhhSRPL._AC_SY445_.jpg'),
(7, 6, 3, NULL, 153, 'Inglourious Basterds\r\n', 'https://thumb.canalplus.pro/http/unsafe/%7BresolutionXY%7D/filters:quality(%7BimageQualityPercentage%7D)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/67767863'),
(8, 5, 3, 4, 117, 'Alien - Le 8ème passager\r\n', 'https://www.critikat.com/wp-content/uploads/fly-images/37055/arton2175-1450x800-c.jpg'),
(9, 4, 4, 2, 50, 'The Last of Us\r\n', 'https://www.francetvinfo.fr/pictures/mSA2nkCbbRun_NQola8IA8QvgCk/752x423/2023/01/26/63d27dc05a52d_840-560.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `genre`
--

CREATE TABLE `genre` (
  `id_genre` int(11) NOT NULL,
  `nom_genre` varchar(9999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `genre`
--

INSERT INTO `genre` (`id_genre`, `nom_genre`) VALUES
(1, 'humour'),
(2, 'drame'),
(3, 'action'),
(4, 'horreur');

-- --------------------------------------------------------

--
-- Structure de la table `realisateur`
--

CREATE TABLE `realisateur` (
  `nom_realisateur` varchar(999) NOT NULL,
  `id_realisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `realisateur`
--

INSERT INTO `realisateur` (`nom_realisateur`, `id_realisateur`) VALUES
('Francis Ford Coppola', 1),
('Peter Jackson', 2),
('David Fincher', 3),
('Craig Mazin\r\n', 4),
('Ridley Scott', 5),
('Quentin Tarantino', 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `generalite`
--
ALTER TABLE `generalite`
  ADD PRIMARY KEY (`id_movie`);

--
-- Index pour la table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id_genre`);

--
-- Index pour la table `realisateur`
--
ALTER TABLE `realisateur`
  ADD PRIMARY KEY (`id_realisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `generalite`
--
ALTER TABLE `generalite`
  MODIFY `id_movie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `genre`
--
ALTER TABLE `genre`
  MODIFY `id_genre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `realisateur`
--
ALTER TABLE `realisateur`
  MODIFY `id_realisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
