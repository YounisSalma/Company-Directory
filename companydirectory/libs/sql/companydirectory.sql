-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6333
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table companydirectory.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `locationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.department: ~12 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`, `locationID`) VALUES
	(1, 'Human Resources', 1),
	(2, 'Sales', 2),
	(3, 'Marketing', 2),
	(4, 'Legal', 1),
	(5, 'Services', 1),
	(6, 'Research and Development', 3),
	(7, 'Product Management', 3),
	(8, 'Training', 4),
	(9, 'Support', 4),
	(10, 'Engineering', 5),
	(11, 'Accounting', 5),
	(12, 'Business Development', 3);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table companydirectory.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.location: ~4 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `name`) VALUES
	(1, 'London'),
	(2, 'New York'),
	(3, 'Paris'),
	(4, 'Munich'),
	(5, 'Rome');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table companydirectory.personnel
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.personnel: ~100 rows (approximately)
/*!40000 ALTER TABLE `personnel` DISABLE KEYS */;
INSERT INTO `personnel` (`id`, `firstName`, `lastName`, `jobTitle`, `email`, `departmentID`) VALUES
(1, 'Robert', 'Heffron', 'HR Generalist', 'rheffron0@ibm.com', 1),
(2, 'Kris', 'Kovnot', 'Sales Manager', 'kkovnot1@google.nl', 2),
(3, 'Vera', 'Kisbee', 'Sales Representative', 'vkisbee2@nih.gov', 2),
(4, 'Aveline', 'Edgson', 'Marketing Manager', 'aedgson3@wikispaces.com', 3),
(5, 'Bertie', 'Wittke', 'Legal Advisor', 'bwittke4@yahoo.com', 4),
(6, 'Demetre', 'Cossam', 'Service Manager', 'dcossam5@washington.edu', 5),
(7, 'Annabela', 'McGavigan', 'Paralegal', 'amcgavigan6@wp.com', 4),
(8, 'Crichton', 'McAndrew', 'Talent Acquisition Specialist', 'cmcandrew7@zdnet.com', 1),
(9, 'Cordula', 'Plain', 'Customer Service Representative', 'cplain8@google.ca', 5),
(10, 'Glen', 'McDougle', 'R&D Manager', 'gmcdougle9@meetup.com', 6),
(11, 'Theo', 'Audas', 'Product Manager', 'taudasa@newsvine.com', 7),
(12, 'Spense', 'Jolliss', 'Training Manager', 'sjollissb@wufoo.com', 8),
(13, 'Leopold', 'Carl', 'Support Manager', 'lcarlc@paginegialle.it', 9),
(14, 'Barr', 'MacAllan', 'Field Service Technician', 'bmacalland@github.com', 5),
(15, 'Suzie', 'Cromer', 'Employee Relations Manager', 'scromere@imageshack.us', 1),
(16, 'Tracee', 'Gisbourn', 'Engineering Manager', 'tgisbournf@bloglines.com', 10),
(17, 'Taylor', 'St. Quintin', 'Software Engineer', 'tstquinting@chronoengine.com', 10),
(18, 'Lin', 'Klassmann', 'Systems Engineer', 'lklassmannh@indiatimes.com', 10),
(19, 'Lay', 'Fintoph', 'Accounting Manager', 'lfintophi@goo.gl', 11),
(20, 'Moishe', 'Flinn', 'Business Development Manager', 'mflinnj@list-manage.com', 12),
(21, 'Gay', 'Bickford', 'Research Scientist', 'gbickfordk@scientificamerican.com', 6),
(22, 'Erik', 'Lindback', 'Training Coordinator', 'elindbackl@virginia.edu', 8),
(23, 'Tamarra', 'Ace', 'Technical Support Specialist', 'tacem@vinaora.com', 9),
(24, 'Barbara-anne', 'Rooksby', 'Business Analyst', 'brooksbyn@issuu.com', 12),
(25, 'Lucien', 'Allsup', 'Customer Support Representative', 'lallsupo@goo.ne.jp', 9),
(26, 'Jackelyn', 'Imlach', 'Accountant', 'jimlachp@google.it', 11),
(27, 'Virge', 'Bootes', 'Account Executive', 'vbootesq@oracle.com', 2),
(28, 'Rafferty', 'Matasov', 'Legal Assistant', 'rmatasovr@4shared.com', 4),
(29, 'Vanya', 'Goulder', 'Customer Support Representative', 'vgoulders@phoca.cz', 9),
(30, 'Bonita', 'McGonagle', 'HR Generalist', 'bmcgonaglet@microsoft.com', 1),
(31, 'Allx', 'Whaley', 'Talent Acquisition Specialist', 'awhaleyu@bbb.org', 1),
(32, 'Mavis', 'Lernihan', 'Customer Service Representative', 'mlernihanv@netscape.com', 5),
(33, 'Vern', 'Durling', 'Employee Relations Manager', 'vdurlingw@goo.gl', 1),
(34, 'Myles', 'Minchi', 'Product Designer', 'mminchix@smugmug.com', 7),
(35, 'Anitra', 'Coleridge', 'Lab Technician', 'acoleridgey@nbcnews.com', 6),
(36, 'Ailis', 'Brewster', 'Product Analyst', 'abrewsterz@businesswire.com', 7),
(37, 'Rahal', 'Tute', 'R&D Manager', 'rtute10@pinterest.com', 6),
(38, 'Warner', 'Blonden', 'Partnership Manager', 'wblonden11@spiegel.de', 12),
(39, 'Melvyn', 'Canner', 'Paralegal', 'mcanner12@eepurl.com', 4),
(40, 'Ryann', 'Giampietro', 'Legal Assistant', 'rgiampietro13@theguardian.com', 4),
(41, 'Harwell', 'Jefferys', 'Engineering Manager', 'hjefferys14@jimdo.com', 10),
(42, 'Lanette', 'Buss', 'Legal Advisor', 'lbuss15@51.la', 4),
(43, 'Lissie', 'Reddington', 'Support Manager', 'lreddington16@w3.org', 9),
(44, 'Dore', 'Braidford', 'Accountant', 'dbraidford17@google.com.br', 11),
(45, 'Lizabeth', 'Di Franceshci', 'Instructional Designer', 'ldifranceshci18@mediafire.com', 8),
(46, 'Felic', 'Sharland', 'Business Development Manager', 'fsharland19@myspace.com', 12),
(47, 'Duff', 'Quail', 'Customer Support Representative', 'dquail1a@vimeo.com', 9),
(48, 'Brendis', 'Shivell', 'HR Generalist', 'bshivell1b@un.org', 1),
(49, 'Nevile', 'Schimaschke', 'Software Engineer', 'nschimaschke1c@hexun.com', 10),
(50, 'Jon', 'Calbaithe', 'Legal Assistant', 'jcalbaithe1d@netvibes.com', 4),
(51, 'Emmery', 'Darben', 'Systems Engineer', 'edarben1e@mapquest.com', 10),
(52, 'Staford', 'Whitesel', 'Research Scientist', 'swhitesel1f@nasa.gov', 6),
(53, 'Benjamin', 'Hawkslee', 'Product Manager', 'bhawkslee1g@hubpages.com', 7),
(54, 'Myrle', 'Speer', 'Marketing Manager', 'mspeer1h@tripod.com', 3),
(55, 'Matthus', 'Banfield', 'Content Strategist', 'mbanfield1i@angelfire.com', 3),
(56, 'Annadiana', 'Drance', 'SEO Specialist', 'adrance1j@omniture.com', 3),
(57, 'Rinaldo', 'Fandrey', 'Sales Representative', 'rfandrey1k@bbc.co.uk', 2),
(58, 'Roanna', 'Standering', 'Content Strategist', 'rstandering1l@cocolog-nifty.com', 3),
(59, 'Lorrie', 'Fattorini', 'Technical Support Specialist', 'lfattorini1m@geocities.jp', 9),
(60, 'Talbot', 'Andrassy', 'Paralegal', 'tandrassy1n@bigcartel.com', 4),
(61, 'Cindi', 'Mannion', 'Accounting Manager', 'comannion1o@ameblo.jp', 11),
(62, 'Pancho', 'Mullineux', 'Talent Acquisition Specialist', 'pmullineux1p@webmd.com', 1),
(63, 'Cynthy', 'Peyntue', 'Lab Technician', 'cpeyntue1q@amazon.co.jp', 6),
(64, 'Kristine', 'Christal', 'Training Coordinator', 'kchristal1r@behance.net', 8),
(65, 'Dniren', 'Reboulet', 'Product Designer', 'dreboulet1s@360.cn', 7),
(66, 'Aggy', 'Napier', 'SEO Specialist', 'anapier1t@sciencedirect.com', 3),
(67, 'Gayleen', 'Hessay', 'Legal Assistant', 'ghessay1u@exblog.jp', 4),
(68, 'Cull', 'Snoden', 'Employee Relations Manager', 'csnoden1v@so-net.ne.jp', 1),
(69, 'Vlad', 'Crocombe', 'Product Analyst', 'vcrocombe1w@mtv.com', 7),
(70, 'Georgeanna', 'Joisce', 'Research Scientist', 'gjoisce1x@google.com.au', 6),
(71, 'Ursola', 'Berthomieu', 'Legal Advisor', 'uberthomieu1y@un.org', 4),
(72, 'Mair', 'McKirdy', 'HR Generalist', 'mmckirdy1z@ovh.net', 1),
(73, 'Erma', 'Runnalls', 'Training Manager', 'erunnalls20@spiegel.de', 8),
(74, 'Heida', 'Gallone', 'Engineering Manager', 'hgallone21@hostgator.com', 10),
(75, 'Christina', 'Denge', 'Business Analyst', 'cdenge22@canalblog.com', 12),
(76, 'Wilone', 'Fredi', 'Product Manager', 'wfredi23@gizmodo.com', 7),
(77, 'Stormie', 'Bolderstone', 'Accountant', 'sbolderstone24@globo.com', 11),
(78, 'Darryl', 'Pool', 'Financial Analyst', 'dpool25@vistaprint.com', 11),
(79, 'Nikolas', 'Mager', 'Customer Service Representative', 'nmager26@nifty.com', 5),
(80, 'Brittney', 'Gaskal', 'Software Engineer', 'bgaskal27@weather.com', 10),
(81, 'Field', 'Gresty', 'Legal Assistant', 'fgresty28@networkadvertising.org', 4),
(82, 'Martina', 'Tremoulet', 'Content Strategist', 'mtremoulet29@sciencedaily.com', 3),
(83, 'Robena', 'Ivanyutin', 'Account Executive', 'rivanyutin2a@mozilla.org', 2),
(84, 'Reagen', 'Corner', 'Financial Analyst', 'rcorner2b@qq.com', 11),
(85, 'Eveleen', 'Sulter', 'Lab Technician', 'esulter2c@nature.com', 6),
(86, 'Christy', 'Dunbobbin', 'Instructional Designer', 'cdunbobbin2d@feedburner.com', 8),
(87, 'Winthrop', 'Lansley', 'Training Coordinator', 'wlansley2e@alibaba.com', 8),
(88, 'Lissa', 'Insley', 'SEO Specialist', 'linsley2f@friendfeed.com', 3),
(89, 'Shell', 'Risebarer', 'Systems Engineer', 'srisebarer2g@patch.com', 10),
(90, 'Cherianne', 'Liddyard', 'Sales Representative', 'cliddyard2h@com.com', 2),
(91, 'Brendan', 'Fooks', 'Account Executive', 'bfooks2i@utexas.edu', 2),
(92, 'Edmund', 'Tace', 'Customer Support Representative', 'etace2j@hatena.ne.jp', 9),
(93, 'Ki', 'Tomasini', 'Engineering Manager', 'ktomasini2k@cnbc.com', 10),
(94, 'Chadd', 'McGettrick', 'Software Engineer', 'cmcgettrick2l@simplemachines.org', 10),
(95, 'Dulcie', 'Baudi', 'Content Strategist', 'dbaudi2m@last.fm', 3),
(96, 'Barnebas', 'Mowbray', 'Employee Relations Manager', 'bmowbray2n@cbslocal.com', 1),
(97, 'Stefanie', 'Anker', 'Field Service Technician', 'sanker2o@hud.gov', 5),
(98, 'Cherye', 'de Cullip', 'Systems Engineer', 'cdecullip2p@loc.gov', 10),
(99, 'Sinclare', 'Deverall', 'Research Scientist', 'sdeverall2q@ow.ly', 6),
(100, 'Shae', 'Johncey', 'Engineering Manager', 'sjohncey2r@bluehost.com', 10);
/*!40000 ALTER TABLE `personnel` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
